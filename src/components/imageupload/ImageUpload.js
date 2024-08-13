import { useAuth } from "../../AuthContext";
import {Dialog, MenuItem, Select} from "@mui/material";
import axios from "axios";

import "./ImageUpload.css";
import { useEffect, useRef, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
function ImageUpload({ onNewPost }) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [captions, setCaptions] = useState('');

    const [noLikes, setNoLikes] = useState(0);
    const [scroll, setScroll] = useState('paper');
    const [imagesURL, setImagesURL] = useState([]);

    const [visibilityOptions, setVisibilityOptions] = useState([]);
    const [selectedVisibility, setSelectedVisibility] = useState('');
    const [imageSelected, setImageSelected] = useState(false);

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
    const handleChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const imagesURLArray = [];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Các loại tệp ảnh được cho phép

            // Lọc ra chỉ các tệp ảnh từ danh sách tệp đã chọn
            const imageFiles = filesArray.filter(file => allowedTypes.includes(file.type));

            // Tạo các URL xem trước cho các tệp ảnh và lưu lại các tệp thực tế
            imageFiles.forEach(file => {
                imagesURLArray.push(URL.createObjectURL(file));
            });

            setImages(prevImages => prevImages.concat(imageFiles)); // Lưu các file ảnh thực tế
            setImagesURL(prevImagesURL => prevImagesURL.concat(imagesURLArray)); // Lưu các URL để xem trước
            setImageSelected(true); // Đặt thành true khi có ảnh được chọn mới

            // Giải phóng bộ nhớ của các URL tạm thời
            filesArray.forEach(file => URL.revokeObjectURL(file));
        }
    };




    const handleRemoveImage = (indexToRemove) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
        setImagesURL(prevImagesURL => prevImagesURL.filter((_, index) => index !== indexToRemove));
    };

    // kích hoạt sự kiện click trên một input type file ẩn
    const uploadFileWithClick = () => {
        document.getElementsByClassName('four')[0].click();
    };

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        if (!imageSelected) {
            setImages([]); // Reset lại state của images khi mở modal
            setImagesURL([]); // Reset lại state của imagesURL khi mở modal
        }
        setScroll(scrollType);

        setCaptions("");
    };


    const handleClose = () => {
        setOpen(false);
        setImages([]);
        setImagesURL([]);
        imagesURL.forEach(url => URL.revokeObjectURL(url));

        setCaptions("");
        setSelectedVisibility("");


    };




    const handleUpload = async (event) => {
        event.preventDefault();

        if (captions === "" && images.length === 0) {
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
            const response = await axios.post('http://localhost:8080/api/posts', formData, {

            });

            console.log('Uploads successful:', response.data);
            const newPost = response.data;
            if (images.length > 0) {
                await uploadImagesToServer(newPost.post_id);
            }

            onNewPost(newPost);
            handleClose();

            setCaptions("");
            setImages([]); // Reset lại state của images
            setImagesURL([]);
            setSelectedVisibility("")



        } catch (error) {
            console.error('Error uploading:', error);
            alert(error.message);
        }
    }


    const uploadImagesToServer = async (postId) => {
        try {
            if (images.length === 0) {
                return; // Nếu không có ảnh nào được chọn, không gọi API
            }

            const imageFormData = new FormData();
            images.forEach((image) => {
                imageFormData.append('images', image); // Thêm các file ảnh thực tế vào formData
            });
            imageFormData.append('account.account_id', user.account_id);
            imageFormData.append('post.post_id', postId);

            const response = await axios.post('http://localhost:8080/api/images', imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Images uploaded successfully', response.data);
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };



    return (
        <div className="imageupload">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <div className="makeStyles-paper-1">
                    <div className="modalInit">
                        <h1>Create Post</h1>
                        <DeleteIcon className="closeModalIcon" onClick={handleClose}/>
                    </div>
                    <div className="hr2"/>
                    <div className="profileHead">
                        <img src="data:image/png;base64,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" className="Avatar" alt="User avatar"/>
                        <div className="nameVisibility" style={{paddingTop: "5px"}}>
                            <h1>{user?.username}</h1>
                            <select
                                className='
'
                                value={selectedVisibility}
                                onChange={(e) => setSelectedVisibility(e.target.value)}
                                style={{height: "20px", background: "white"}}
                            >
                                {visibilityOptions.map(option => (
                                    <option key={option.visibility_id} value={option.visibility_id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>

                        </div>


                    </div>
                    <div className="inputForUpload">
                        <input onChange={handleChange} type="file" accept="image/*"className="four" multiple/>
                        <textarea value={captions} onChange={(e) => setCaptions(e.target.value)} rows="4"
                                  placeholder={`What's on your mind, ${user?.username}?`}/>
                    </div>
                    <div className="previewImages">
                        {imagesURL.map((imageURL, index) => (
                            <div className="previewImageContainer" key={index}>
                                <img src={imageURL} className="previewImage" alt="Preview"/>
                                <button className="deleteIcon" onClick={() => handleRemoveImage(index)}>&times;</button>
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
                            <i className="Icon photoIcon" onClick={uploadFileWithClick}/>
                            <i className="Icon roomIcon" onClick={uploadFileWithClick}/>

                            <i className="Icon feelingIcon"/>
                            <i className="Icon friendsIcon"/>

                            <i className="Icon tagIcon"/>
                            <i className="Icon moreIcon"/>
                        </div>
                    </div>
                    <button onClick={handleUpload} type="submit"
                            className={`postButton ${captions.length < 1 && "disabled"} ${images.length > 0 && "visible"}`}>Post
                    </button>
                </div>
            </Dialog>

            <div className="imageupload__container">
                <div className="postArea">
                    <img
                        src="data:image/png;base64,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" className="Avatar" alt="User avatar"/>
                    <input value={captions} onChange={(e) => setCaptions(e.target.value)}
                           onClick={handleClickOpen('body')} placeholder={`What's on your mind, ${user?.username}?`} />
                </div>
                <div className="hr" />
                <div className="options">
                    <div class="liveVideo" onClick={handleClickOpen('body')}>
                        <i class="liveVideoIcon" />
                        <h2>Live video</h2>
                    </div>
                    <div class="photo" onClick={handleClickOpen('body')}>
                        <i class="photoIcon" />
                        <h2>Photo/Video</h2>
                    </div>
                    <div className="feeling" onClick={handleClickOpen('body')}>
                        <i className="feelingIcon"/>
                        <h2>Feeling/Activity</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ImageUpload;