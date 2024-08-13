import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Avatar, Dialog} from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import "./Post.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";






function Post({ postId, user, username, caption, noLikes, postUserId ,visibility, onDeleteSuccess,onUpdatedPost}){
    const [scroll, setScroll] = useState('paper');
    const [open, setOpen] = useState(true);
    const [existingImages, setExistingImages] = useState([]);
    const [editedImages, setEditedImages] = useState([]);
    const [captions, setCaptions] = useState(caption);

    const [visibilityOptions, setVisibilityOptions] = useState([]);
    const [selectedVisibility, setSelectedVisibility] = useState(String(visibility));
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like2');
    const [show2, setShow2] = useState('textforlike');
    const [posterImage, setPosterImage] = useState('');

    const[images,setImages]=   useState([]);
    const imagesCount=images.length;
    const [menuOpen, setMenuOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [];
        const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

        files.forEach(file => {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (validImageExtensions.includes(fileExtension)) { // Kiểm tra đuôi tệp
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push({
                        name: file.name,
                        dataUrl: reader.result
                    });
                    setEditedImages(prevImages => [...prevImages, ...newImages]);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Chỉ có thể chọn file ảnh có định dạng: ' + validImageExtensions.join(', ') + '.');
            }
        });
    };

    const fetchVisibility = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/visibilities');
            setVisibilityOptions(response.data);

        } catch (error) {
            console.error('Error fetching visibility options:', error);
        }
    };

    useEffect(() => {
        fetchVisibility();
    }, []);

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
    const handleEditClick = () => {

        setExistingImages(images);
        setSelectedVisibility(visibility);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setEditedImages([]);
        setOpenEditModal(false);
    };
    const handleDeleteImage = (index, isEdited) => {
        if (isEdited) {
            // Xóa ảnh từ editedImages
            const updatedEditedImages = editedImages.filter((_, i) => i !== index);
            setEditedImages(updatedEditedImages);
        } else {
            // Xóa ảnh từ existingImages
            const updatedExistingImages = [...existingImages];
            updatedExistingImages.splice(index, 1);
            setExistingImages(updatedExistingImages);
        }
    };



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
    const uploadFile = () => {
        document.getElementsByClassName('four')[0].click();
    };
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/friends/${user.account_id}`);
                setUserFriends(response.data);

            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        if (user.account_id) {
            fetchFriends();
        }
    }, [user.account_id]);

    const canViewPost = () => {

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

            return true;
        }
        return false;
    };
    useEffect(() => {
        let isSubscribed = true;

        if (postId) {
            axios.get(`http://localhost:8080/comments/${postId}`)
                .then(response => {
                    if (isSubscribed) {
                        setComments(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });
        }

        return () => {
            isSubscribed = false;
        };
    }, [postId]);
    const handleEditPost = async (event) => {
        event.preventDefault();

        if (captions === "" && editedImages.length === 0) {
            alert("Please select an image or enter a caption.");
            return;
        }
        if (!captions || !user.username || !user.account_id || !selectedVisibility) {
            alert('Vui lòng điền đầy đủ thông tin trước khi gửi.');
            return;
        }
        const postButton = document.getElementsByClassName('postButton')[0];
        postButton.disabled = true;
        postButton.classList.add('disabled');

        try {
            const formData = new FormData();
            formData.append('content', captions);

            formData.append('account.account_id', user.account_id);
            formData.append('visibility.visibility_id', selectedVisibility);

            const response = await axios.put(`https://6614df922fc47b4cf27d4eda.mockapi.io/api/v1/:id`, formData)

            console.log('Post updated successfully:', response.data);
            const updatedPost = response.data;
            if (editedImages.length > 0) {
                await updateImagesOnServer(updatedPost.post_id);
            }

            onUpdatedPost(updatedPost);
            handleCloseEditModal();

            setCaptions("");
            setEditedImages([]);
            setExistingImages([]);
            setSelectedVisibility("");

        } catch (error) {
            console.error('Error updating post:', error);
            alert(error.message);
        } finally {
            postButton.disabled = false;
            postButton.classList.remove('disabled');
        }
    }

    const updateImagesOnServer = async (postId) => {
        try {
            if (editedImages.length === 0) {
                return;
            }

            const imageFormData = new FormData();
            editedImages.forEach((image) => {
                imageFormData.append('images', image.file);
            });
            imageFormData.append('account.account_id', user.account_id);
            imageFormData.append('post.post_id', postId);

            const response = await axios.put(`http://localhost:8080/api/images/${postId}`, imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Images updated successfully', response.data);
        } catch (error) {
            console.error('Error updating images:', error);
        }
    }
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
                                        <li onClick={handleEditClick}>
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
                {/*/!*<form onSubmit={postComment}>*!/ them bl*/}
                {/*    <div className="commentBox">*/}
                {/*        <Avatar*/}
                {/*            className="post__avatar2"*/}
                {/*            alt=""*/}
                {/*            src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"*/}
                {/*        />*/}
                {/*        <input className="commentInputBox" type="text" placeholder="Write a comment ... "*/}
                {/*               value={comment}*/}
                {/*               onChange={(e) => setComment(e.target.value)}/>*/}
                {/*        <input type="submit" className="transparent__submit"/>*/}
                {/*    </div>*/}
                {/*    <p className="pressEnterToPost">Press Enter to post</p>*/}
                {/*</form>*/}

                {
                    comments.map((comment) => (
                        <div className={`comments__show ${comment.account.account_id == postUserId && 'myself'}`}>
                            <Avatar
                                className="post__avatar2"
                                alt=""
                                src={comment.image}
                            />
                            <div class="container__comments">
                                <p><span>{comment.account.username}</span><i
                                    class="post__verified"></i>&nbsp;{comment.content}</p>
                            </div>
                        </div>
                    ))
                }
            </div>) : null}


            <Dialog open={openEditModal} onClose={handleCloseEditModal} scroll={scroll}>
                <div className="makeStyles-paper-1">
                    <div className="modalInit">
                        <h1>Edit Post</h1>
                        <DeleteIcon className="closeModalIcon" onClick={handleCloseEditModal}/>
                    </div>
                    <div className="hr2"/>
                    <div className="profileHead">
                        <img src={user?.avatar} className="Avatar" alt="User avatar"/>
                        <div className="nameVisibility" style={{paddingTop: "5px"}}>
                            <h1>{user?.username}</h1>
                            <select
                                className='createpost-select'
                                value={selectedVisibility}

                                onChange={(e) => setSelectedVisibility(e.target.value)}
                                style={{height: "20px", background: "white"}}
                            >
                                {visibilityOptions.map((option) => {

                                    return (
                                        <option
                                            key={option.visibility_id}
                                            value={option.name}

                                        >
                                            {option.name}
                                        </option>
                                    );
                                })}
                            </select>


                        </div>
                    </div>
                    <div className="inputForUpload">
                        <input type="file" onChange={handleFileChange} accept="image/*" className="four" multiple/>
                        <textarea value={captions} onChange={(e) => setCaptions(e.target.value)} rows="4"
                                  placeholder={`What's on your mind, ${user?.username}?`}/>
                    </div>
                    <div className="previewImages">
                        {existingImages.map((image, index) => (
                            <div className="previewImageContainer" key={`existing-${index}`}>
                                <img src={`http://localhost:8080/video/${encodeURIComponent(image.name)}`}
                                     className="previewImage" alt="Preview"/>
                                <button className="deleteIcon"
                                        onClick={() => handleDeleteImage(index, false)}>&times;</button>
                            </div>
                        ))}
                        {editedImages.map((image, index) => (
                            <div className="previewImageContainer" key={`edited-${index}`}>
                                <img src={image.dataUrl} className="previewImage" alt="Preview"/>
                                <button className="deleteIcon"
                                        onClick={() => handleDeleteImage(index, true)}>&times;</button>
                            </div>
                        ))}
                    </div>

                    <img alt="" className="colorAlpha"
                         src="https://facebook.com/images/composer/SATP_Aa_square-2x.png"/>
                    <div className="publishOptions">
                        <div className="left">
                            <h1>Add to your post</h1>
                        </div>
                        <div className="right">
                            <i className="Icon photoIcon" onClick={uploadFile}/>
                            <i className="Icon roomIcon"/>
                            <i className="Icon feelingIcon"/>
                            <i className="Icon friendsIcon"/>
                            <i className="Icon tagIcon"/>
                            <i className="Icon moreIcon"/>
                        </div>
                    </div>
                    <div className="actions">
                        <button type="submit" onClick={handleEditPost}
                                className={`postButton ${captions.length < 1 && "disabled"} ${images.length > 0 && "visible"}`}>
                            Save Changes
                        </button>

                    </div>
                </div>
            </Dialog>

        </div>
    )
}

export default Post