'use client'
import React, { useState } from 'react'
// import firebase from 'firebase/app'
// import 'firebase/storage'
import { storage } from '@/firebase'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'

const ImageUploadComponent = () => {
	const [selectedImage, setSelectedImage] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [imageURL, setImageURL] = useState('')

	// Initialize Firebase
	// const firebaseConfig = {
	// 	apiKey: 'AIzaSyBauJ6vzcumvxK9IQUGotdmRXlJN-jt7oI',
	// 	authDomain: 'sendit-stack.firebaseapp.com',
	// 	projectId: 'sendit-stack',
	// 	storageBucket: 'sendit-stack.appspot.com',
	// 	messagingSenderId: '506956795216',
	// 	appId: '1:506956795216:web:0ae2cc0ab9684b06463055',
	// }

	// if (!firebase.apps.length) {
	// firebase.initializeApp(firebaseConfig)
	// }

	const handleImageUpload = (e) => {
		const file = e.target.files[0]

		// const storage = getStorage()
		const storageRef = ref(storage, 'images/rivers.jpg')

		if (file) {
			const uploadTask = uploadBytesResumable(storageRef, file)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log('Upload is ' + progress + '% done')
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused')
							break
						case 'running':
							console.log('Upload is running')
							break
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL)
					})
				}
			)
		}

		// if (file) {
		// 	setSelectedImage(file)

		// 	const uploadTask = storage.storage().ref(`images/${file.name}`).put(file)

		// 	uploadTask.on(
		// 		'state_changed',
		// 		(snapshot) => {
		// 			// Track upload progress
		// 			const progress = Math.round(
		// 				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
		// 			)
		// 			setUploadProgress(progress)
		// 		},
		// 		(error) => {
		// 			// Handle upload error
		// 			console.error(error)
		// 		},
		// 		() => {
		// 			// Upload complete
		// 			storage
		// 				.storage()
		// 				.ref('images')
		// 				.child(file.name)
		// 				.getDownloadURL()
		// 				.then((url) => {
		// 					setImageURL(url)
		// 				})
		// 		}
		// 	)
		// }
	}

	return (
		<div>
			<input type='file' onChange={handleImageUpload} />
			{selectedImage && (
				<div>
					<p>Uploading: {selectedImage.name}</p>
					<p>Progress: {uploadProgress}%</p>
				</div>
			)}
			{imageURL && (
				<div>
					<img src={imageURL} alt='Uploaded' />
				</div>
			)}
		</div>
	)
}

export default ImageUploadComponent
