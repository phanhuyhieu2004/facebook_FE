import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Avatar} from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import "./Post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Dialog, MenuItem, Select} from "@mui/material";



function Post({ postId, user, username, caption, noLikes, postUserId ,visibility, onDeleteSuccess}){
    // const [open, setOpen] = useState(true);
    //
    // const [captions, setCaptions] = useState(caption);
    // const [visibilityOptions, setVisibilityOptions] = useState([]);
    // const [selectedVisibility, setSelectedVisibility] = useState(visibility);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('');
    // const [postUser, setPostUser] = useState();
    const[images,setImages]=   useState([]);
    const imagesCount=images.length;
    const [menuOpen, setMenuOpen] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);

    // useEffect(() => {
    //     if (postUserId) {
    //         axios.get(`http://localhost:8080/api/accounts/${postUserId}`)
    //             .then(response => {
    //                 setPostUser(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching post user data:', error);
    //             });
    //     }
    // }, [postUserId]);
    //
    useEffect(() => {
        if (postId) {
            axios.get(`http://localhost:8080/api/images?post_id=${postId}`)
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        setImages(response.data);
                    }
                })
                .catch((error) => {
                    setImages([])
                    console.error('Error fetching image:', error);
                });
        }
    }, [postId]);
    // const fetchVisibility = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/visibilities');
    //         setVisibilityOptions(response.data);
    //
    //     } catch (error) {
    //         console.error('Error fetching visibility options:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchVisibility();
    // }, []);
    const handleDeleteClick = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            axios.delete(`http://localhost:8080/api/posts/${postId}`)
                .then(response => {
                    alert('Post deleted successfully');
                    onDeleteSuccess(postId); // Gọi hàm để cập nhật mảng posts
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                    alert('Failed to delete post');
                });
        }
    }
    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };
    // const handleEditClick = () => {
    //     setOpenEditModal(true);
    // };
    //
    // const handleCloseEditModal = () => {
    //     setOpenEditModal(false);
    // };
    //
    // useEffect(() => {
    //     if (postUserId) {
    //         axios.get(`http://localhost:8080/api/accounts/${postUserId}`)
    //             .then(response => {
    //                 setPosterImage(response.data.avatar);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching post user data for poster image:', error);
    //             });
    //     }
    // }, []);
    // const handleEdit = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('content', captions);
    //         formData.append('visibility.visibility_id', selectedVisibility);
    //
    //         await axios.put(`http://localhost:8080/api/posts/${postId}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //
    //         alert('Post updated successfully');
    //
    //     } catch (error) {
    //         console.error('Error updating post:', error);
    //         alert('Failed to update post');
    //     }
    // };
    //
    //
    // useEffect(() => {
    //     if (postId && user.account_id) {
    //         axios.get(`http://localhost:8080/posts/${postId}/likes/${user.account_id}`)
    //             .then(response => {
    //                 if (response.data) {
    //                     if (show === 'like2') {
    //                         setShow('like2 blue');
    //                         setShow2('textforlike bluetextforlike');
    //                     } else {
    //                         setShow('like2');
    //                         setShow2('textforlike');
    //                     }
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error("Error check like"+error);
    //             });
    //     }
    // }, [postId, user.account_id]);
    //
    // const likeHandle = (event) => {
    //     event.preventDefault();
    //     if (show === 'like2') {
    //         setShow('like2 blue');
    //         setShow2('textforlike bluetextforlike');
    //         axios.post(`http://localhost:8080/posts/${postId}/likes`, { userId: user.account_id })
    //             .then(response => {
    //                 axios.put(`http://localhost:8080/api/posts/${postId}`, { noLikes: response.data.noLikes });
    //             })
    //             .catch(error => {
    //                 console.error("Error create like"+error);
    //             });
    //     } else {
    //         setShow('like2');
    //         setShow2('textforlike');
    //         axios.delete(`http://localhost:8080/posts/${postId}/likes/${user.account_id}`)
    //             .then(response => {
    //                 axios.put(`http://localhost:8080/api/posts/${postId}`, { noLikes: response.data.noLikes });
    //             })
    //             .catch(error => {
    //                 console.error("Error delete like"+error);
    //             });
    //     }
    // };
    // useEffect(() => {
    //     let isSubscribed = true;
    //
    //     if (postId) {
    //         axios.get(`http://localhost:8080/comments/${postId}`)
    //             .then(response => {
    //                 if (isSubscribed) {
    //                     setComments(response.data);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching comments:', error);
    //             });
    //     }
    //
    //     return () => {
    //         isSubscribed = false;
    //     };
    // }, [postId]);
    //
    // const postComment = (event) => {
    //     event.preventDefault();
    //
    //     const formData = new FormData();
    //     formData.append('name', comment);
    //     formData.append('account.account_id', user?.account_id); // Thêm ID của tài khoản đăng nhập
    //     formData.append('post.post_id', postId); // Thêm ID của bài đăng
    //     formData.append('image', "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg");
    //
    //     axios.post(`http://localhost:8080/comments/${postId}`, formData)
    //         .then(response => {
    //             console.log('Comment posted successfully:', response.data);
    //             setComment('');
    //             // Nếu muốn hiển thị bình luận mới ngay khi thêm, bạn có thể thêm bình luận mới vào state
    //             // setComments([...comments, response.data]);
    //         })
    //         .catch(error => {
    //             console.error('Error posting comment:', error);
    //         });
    // }
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/friends/${user.account_id}`);
                setUserFriends(response.data);
                console.log("Fetched friends:", response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        if (user.account_id) {
            fetchFriends();
        }
    }, [user.account_id]);

    const canViewPost = () => {
        console.log('User friends:', userFriends)
        if (user.account_id === postUserId) {
            return true;
        }
        if (visibility === 'public') {
            return true;
        }
        if (visibility === 'private' && user.account_id === postUserId) {
            return true;
        }
        if (visibility === 'friend' && userFriends.some(friend => friend.account_id === postUserId)) {
            console.log("User can view friend post");
            return true;
        }
        return false;
    };

    return (
        <div>  {canViewPost() ? (
            <div className="post">


                <div className="post__header">
                    <Avatar
                        className="post__avatar"
                        alt=""
                        src={posterImage !== '' && posterImage}
                    />
                    <div className="post_visibility">
                        <h3 onClick={() => {
                            window.location.href = `/${username}/${user?.account_id}`
                        }} style={{cursor: 'pointer'}}>{username}</h3>
                        <p>{visibility}</p>
                    </div>

                    <VerifiedIcon className="post__verified"/>
                    {user?.account_id === postUserId && (
                        <div className="customMenu">
                            <div className="iconContainer" onClick={handleMenuClick}>
                                <MoreHorizIcon/>
                            </div>
                            {menuOpen && (
                                <div className="customMenuContent">
                                    <ul>
                                        <li>
                                            <EditIcon/>
                                            <span>Edit</span>
                                        </li>
                                        <li onClick={handleDeleteClick}>
                                            <DeleteIcon/>
                                            <span>Delete</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>


                <h4 className="post__text">{caption}</h4>
                <div className={`post__images ${imagesCount === 1 ? 'single-image' : ''}`}>
                    {images.map(image => (
                        <div
                            key={image.name}
                            className="post__image"
                            style={{backgroundImage: `url(http://localhost:8080/video/${encodeURIComponent(image.name)}`}}
                            alt="Post Image"
                        />
                    ))}
                </div>


                <div className="post__likeandlove">
                    <img
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"
                        className="post__like"/>
                    <img
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e"
                        className="post__lol"/>
                    <img
                        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='10.25%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FEEA70'/%3e%3cstop offset='100%25' stop-color='%23F69B30'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23472315'/%3e%3cstop offset='100%25' stop-color='%238B3A0E'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23191A33'/%3e%3cstop offset='87.162%25' stop-color='%233B426A'/%3e%3c/linearGradient%3e%3clinearGradient id='j' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23E78E0D'/%3e%3cstop offset='100%25' stop-color='%23CB6000'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/%3e%3c/filter%3e%3cfilter id='g' width='111.1%25' height='133.3%25' x='-5.6%25' y='-16.7%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='.5'/%3e%3cfeOffset in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.0980392157 0 0 0 0 0.101960784 0 0 0 0 0.2 0 0 0 0.819684222 0'/%3e%3c/filter%3e%3cfilter id='h' width='204%25' height='927.2%25' x='-52.1%25' y='-333.3%25' filterUnits='objectBoundingBox'%3e%3cfeOffset dy='1' in='SourceAlpha' result='shadowOffsetOuter1'/%3e%3cfeGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='1.5'/%3e%3cfeColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0.803921569 0 0 0 0 0.388235294 0 0 0 0 0.00392156863 0 0 0 0.14567854 0'/%3e%3c/filter%3e%3cpath id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/%3e%3cpath id='f' d='M3.5 5.5c0-.828.559-1.5 1.25-1.5S6 4.672 6 5.5C6 6.329 5.441 7 4.75 7S3.5 6.329 3.5 5.5zm6.5 0c0-.828.56-1.5 1.25-1.5.691 0 1.25.672 1.25 1.5 0 .829-.559 1.5-1.25 1.5C10.56 7 10 6.329 10 5.5z'/%3e%3cpath id='i' d='M11.068 1.696c.052-.005.104-.007.157-.007.487 0 .99.204 1.372.562a.368.368 0 01.022.51.344.344 0 01-.496.024c-.275-.259-.656-.4-.992-.369a.8.8 0 00-.59.331.346.346 0 01-.491.068.368.368 0 01-.067-.507 1.49 1.49 0 011.085-.612zm-7.665.555a2.042 2.042 0 011.372-.562 1.491 1.491 0 011.242.619.369.369 0 01-.066.507.347.347 0 01-.492-.068.801.801 0 00-.59-.331c-.335-.031-.717.11-.992.369a.344.344 0 01-.496-.024.368.368 0 01.022-.51z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='url(%23d)' d='M5.643 10.888C5.485 12.733 6.369 14 8 14c1.63 0 2.515-1.267 2.357-3.112C10.2 9.042 9.242 8 8 8c-1.242 0-2.2 1.042-2.357 2.888'/%3e%3cuse fill='url(%23e)' xlink:href='%23f'/%3e%3cuse fill='black' filter='url(%23g)' xlink:href='%23f'/%3e%3cpath fill='%234E506A' d='M4.481 4.567c.186.042.29.252.232.469-.057.218-.254.36-.44.318-.186-.042-.29-.252-.232-.47.057-.216.254-.36.44-.317zm6.658.063c.206.047.322.28.258.52-.064.243-.282.4-.489.354-.206-.046-.322-.28-.258-.521.063-.242.282-.4.49-.353z'/%3e%3cuse fill='black' filter='url(%23h)' xlink:href='%23i'/%3e%3cuse fill='url(%23j)' xlink:href='%23i'/%3e%3c/g%3e%3c/svg%3e"
                        class="post_ooo"/>
                    <p>{noLikes} {noLikes == 1 ? "Like" : "Likes"}</p>
                </div>

                <div className="hr"/>

                <div className="post__likeoptions">
                    <div className="like">
                        <i className={show}/>
                        <h3 className={show2}>Like</h3>
                    </div>
                    <div className="comment">
                        <i className="comment2"/>
                        <h3 class="dope">Comment</h3>
                    </div>
                    <div className="share">
                        <i className="share2"/>
                        <h3>Share</h3>
                    </div>
                </div>
                {/*<form onSubmit={postComment}>*/}
                {/*    <div className="commentBox">*/}
                {/*        <Avatar*/}
                {/*            className="post__avatar2"*/}
                {/*            alt=""*/}
                {/*            src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"*/}
                {/*        />*/}
                {/*        <input className="commentInputBox" type="text" placeholder="Write a comment ... " value={comment}*/}
                {/*               onChange={(e) => setComment(e.target.value)}/>*/}
                {/*        <input type="submit"  className="transparent__submit"/>*/}
                {/*    </div>*/}
                {/*    <p className="pressEnterToPost">Press Enter to post</p>*/}
                {/*</form>*/}

                {/*{*/}
                {/*    comments.map((comment) => (*/}
                {/*        <div className={`comments__show ${comment.account.account_id == postUserId && 'myself'}`}>*/}
                {/*            <Avatar*/}
                {/*                className="post__avatar2"*/}
                {/*                alt=""*/}
                {/*                src={comment.image}*/}
                {/*            />*/}
                {/*            <div class="container__comments">*/}
                {/*                <p><span>{comment.account.username}</span><i class="post__verified"></i>&nbsp;{comment.name}</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}
            </div>) : null}
            {/*<div className="editpost">*/}
            {/*    <Dialog*/}
            {/*        open={open}*/}
            {/*        onClose={handleClose}*/}
            {/*        scroll={scroll}*/}
            {/*    >*/}
            {/*        <div className="makeStyles-paper-2">*/}
            {/*            <div className="modalInits">*/}
            {/*                <h1>Create Post</h1>*/}
            {/*                /!*<CloseIcon className="closeModalIcon" onClick={handleClose}/>*!/*/}
            {/*            </div>*/}
            {/*            <div className="hr2s"/>*/}
            {/*            <div className="profileHeads">*/}
            {/*                <img*/}
            {/*                    src="data:image/png;base64,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"*/}
            {/*                    className="Avatar" alt="User avatar"/>*/}
            {/*                <div className="nameVisibilitys" style={{paddingTop: "5px"}}>*/}
            {/*                    <h1>{user?.username}</h1>*/}
            {/*                    <select*/}
            {/*                        className='createpost-selects'*/}
            {/*                        value={selectedVisibility}*/}
            {/*                        onChange={(e) => setSelectedVisibility(e.target.value)}*/}
            {/*                        style={{height: "20px", background: "white"}}*/}
            {/*                    >*/}
            {/*                        {visibilityOptions.map(option => (*/}
            {/*                            <option key={option.visibility_id} value={option.visibility_id}>*/}
            {/*                                {option.name}*/}
            {/*                            </option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}

            {/*                </div>*/}


            {/*            </div>*/}
            {/*            <div className="inputForUploads">*/}
            {/*                <input onChange={handleChange} type="file" accept="image/*" className="four" multiple/>*/}
            {/*                <textarea value={captions} onChange={(e) => setCaptions(e.target.value)} rows="4"*/}
            {/*                          placeholder={`What's on your mind, ${user?.username}?`}/>*/}
            {/*            </div>*/}
            {/*            <div className="previewImages">*/}
            {/*                {imagesURL.map((imageURL, index) => (*/}
            {/*                    <div className="previewImageContainer" key={index}>*/}
            {/*                        <img src={imageURL} className="previewImage" alt="Preview"/>*/}
            {/*                        <button className="deleteIcon"*/}
            {/*                                onClick={() => handleRemoveImage(index)}>&times;</button>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </div>*/}

            {/*            <img alt="" className="colorAlpha"*/}
            {/*                 src="https://facebook.com/images/composer/SATP_Aa_square-2x.png"/>*/}


            {/*            <div className="publishOptions">*/}
            {/*                <div className="left">*/}
            {/*                    <h1>Add to your post</h1>*/}
            {/*                </div>*/}
            {/*                <div className="right">*/}
            {/*                    <i className="Icon photoIcon" onClick={uploadFileWithClick}/>*/}
            {/*                    <i className="Icon roomIcon" onClick={uploadFileWithClick}/>*/}

            {/*                    <i className="Icon feelingIcon"/>*/}
            {/*                    <i className="Icon friendsIcon"/>*/}

            {/*                    <i className="Icon tagIcon"/>*/}
            {/*                    <i className="Icon moreIcon"/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <button onClick={handleUpload} type="submit"*/}
            {/*                    className={`postButton ${captions.length < 1 && "disabled"} ${images.length > 0 && "visible"}`}>Post*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </Dialog>*/}

            {/*    <div className="imageupload__containers">*/}
            {/*        <div className="postAreas">*/}
            {/*            <img*/}
            {/*                src="data:image/png;base64,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"*/}
            {/*                className="Avatar" alt="User avatar"/>*/}
            {/*            <input value={captions} onChange={(e) => setCaptions(e.target.value)}*/}
            {/*                   onClick={handleClickOpen('body')}*/}
            {/*                   placeholder={`What's on your mind, ${user?.username}?`}/>*/}
            {/*        </div>*/}
            {/*        <div className="hrs"/>*/}
            {/*        <div className="optionss">*/}
            {/*            <div className="liveVideos" onClick={handleClickOpen('body')}>*/}
            {/*                <i className="liveVideoIcons"/>*/}
            {/*                <h2>Live video</h2>*/}
            {/*            </div>*/}
            {/*            <div className="photos" onClick={handleClickOpen('body')}>*/}
            {/*                <i className="photoIcons"/>*/}
            {/*                <h2>Photo/Video</h2>*/}
            {/*            </div>*/}
            {/*            <div className="feelings" onClick={handleClickOpen('body')}>*/}
            {/*                <i className="feelingIcons"/>*/}
            {/*                <h2>Feeling/Activity</h2>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Post