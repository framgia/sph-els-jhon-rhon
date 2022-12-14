    import React, { useEffect, useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
    import { map } from 'lodash';

    import axios from '../api/axios';
    import BackButton from '../components/molecules/BackButton';
    import TrashButton from '../components/atoms/TrashButton';
    import PenButton from '../components/atoms/PenButton';
    import { lessonData, setLessonError } from '../redux/lesson';
    import { setWordsData, setWordsError } from '../redux/words';
    import { setPaginateData } from '../redux/paginate';
    import Section from '../components/atoms/Section';
    import Pagination from '../components/organisms/Pagination';
    import PageError from '../components/organisms/PageError';
    import Empty from '../components/atoms/Empty';
    import ModalForm from '../components/organisms/ModalForm';
    import HeaderError from '../components/atoms/HeaderError';
    import { deleteWordError, deleteWordKey } from '../redux/deleteWord';

    const Lesson = () => {
        const { lesson, lessonError } = useSelector(state => state.lesson);
        const { paginateData } = useSelector(state => state.paginate)
        const { wordsData, wordsError } = useSelector(state => state.words);
        const { token } = useSelector(state => state.persist.userAuthentication);
        const { deleteKey, deleteError } = useSelector(state => state.deleteWord);
        const [ isOpen, setIsOpen ] = useState(false);
        const dispatch = useDispatch();
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const [searchParams] = useSearchParams();

        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const fetchWords = async () => {
            const search = (searchParams.get('page') && searchParams.get('page') > 0)? location.search: '';

            try {
                const words = await axios.get(`/admin/categories/${params.id}/words${search}`, axiosConfig);
                
                if(!searchParams.get('page') || (searchParams.get('page') < 1)) {
                    window.history.replaceState(null, null, `${location.pathname}?page=${words.data.current_page}`);
                }

                if((words.data.data.length === 0) && (words.data.last_page > 1)) {
                    navigate(`${location.pathname}?page=${words.data.last_page}`, {replace: true});
                }

                dispatch(await setWordsData(words.data.data));
                dispatch(await setPaginateData({
                    'current_page': words.data.current_page,
                    'last_page': words.data.last_page,
                    'from': words.data.from,
                    'to': words.data.to,
                    'per_page': words.data.per_page,
                    'total': words.data.total 
                }));
            }
            catch(error) {
                if(error.response.status === 500) {
                    dispatch(setWordsError({key: 'header', value: 'No response from the server'}));
                    return;
                }

                dispatch(setWordsError({key: 'header', value: 'Failed to fetch words'}));
            }
        }

        const fetchLesson = async () => {
            try {
                const lesson = await axios.get(`/categories/${params.id}`, axiosConfig);

                dispatch(await lessonData(lesson.data));
            }
            catch(error) {
                if(error.response.status === 404) {
                    dispatch(setLessonError({key: 'header', value: 'Lesson not found'}));
                    return;
                }

                if(error.response.status === 500) {
                    dispatch(setLessonError({key: 'header', value: 'No response from the server'}));
                    return;
                }

                dispatch(setLessonError({key: 'header', value: 'Failed to fetch lesson'}));
            }
        }

        useEffect(() => {
            fetchLesson();
            fetchWords();
        }, [dispatch, location]);

        const onDelete = (id) => {
            setIsOpen(true);
            dispatch(deleteWordError(''));
            dispatch(deleteWordKey(id));
        }

        const submitDelete = async (event) => {
            event.preventDefault();

            try {
                const response = await axios.post(`/admin/categories/words/${deleteKey}/delete`, deleteKey, axiosConfig);            
                
                dispatch(deleteWordError(''));
                dispatch(deleteWordKey(''));

                setIsOpen(false);
                fetchWords();
            }
            catch(error) {
                if(error.response.status === 404) {
                    dispatch(deleteWordError({key: 'header', value: 'Word not found'}));
                    return;
                }

                if(error.response.status === 401) {
                    dispatch(deleteWordError({key: 'header', value: 'Administrative Privileges Required'}));
                    return;
                }

                if(error.response.status === 500) {
                    dispatch(deleteWordError({key: 'header', value: 'No response from the server'}));
                    return;
                }
                
                dispatch(deleteWordError({key: 'header', value: 'Delete Word Failed'}));
            }
        }
        
        if(lessonError.header) {
            return <PageError>{lessonError.header}</PageError>
        }

        return (
            <Section>
                <ModalForm isOpen={isOpen} onSubmit={submitDelete} onClose={() => setIsOpen(false)} modalHeader='Confirm Delete' submitText='Delete' btnBgColor='bg-red-500 hover:bg-red-700 focus:outline-red-500'>
                    <HeaderError></HeaderError>
                    Are you sure you want to delete?
                </ModalForm>
                <div className='container w-full lg:w-1/2 mx-auto mt-6'>
                    <BackButton />
                </div>
                <div className='container w-full lg:w-1/2 mx-auto mt-6 divide-y-2 divide-blue-200'>
                    <div className='flex flex-col'>
                        <div className='text-start text-xl font-semibold'>
                            {lesson.title}
                        </div>
                        <div className='text-start text-l'>
                            {lesson.description}
                        </div>
                    </div>
                    <div className='flex flex-col mt-6'>
                        <div className='text-start text-xl mt-2'>
                            Words
                        </div>
                        <div className='p-3 lg:p-6 grid lg:grid-cols-2'>
                            {
                                map(wordsData, function(value, key) {
                                    if(value) {
                                        return (
                                            <div key={key} className='w-auto py-2 px-3 items-center rounded rounded-sm border border-blue-300  m-2 flex flex-row justify-between'>
                                                <div>{value.word}</div>
                                                <div className='w-90 flex flex-row space-x-1'>
                                                    <Link to={`/admin/categories/words/${value.id}/edit`}><PenButton btnType='button'/></Link>
                                                    <TrashButton onClick={() => onDelete(value.id)} btnType='button'/>
                                                </div>
                                            </div>
                                        );
                                    }
                                })
                            }
                        <Empty data={wordsData}><div className='w-full'>No words to show...</div></Empty>
                        </div>
                    </div>   
                    <Pagination paginateData={paginateData} />
                </div>
            </Section>
        );
    }

    export default Lesson;
