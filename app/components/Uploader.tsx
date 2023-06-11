'use client'
import React, { useState } from 'react'
import { storage, db } from '@/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const ImageUploadComponent = () => {
	const [selectedImage, setSelectedImage] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [imageURL, setImageURL] = useState('')

	const handleImageUpload = (e) => {
		const file = e.target.files[0]

		if (!file.type.includes('image')) {
			toast.error('Please upload an image file!')
			return
		}

		const storageRef = ref(storage, `images/${file.name}`)

		if (file) {
			console.log('file', file)
			setSelectedImage(file.name)
			const uploadTask = uploadBytesResumable(storageRef, file)
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setUploadProgress(progress)
					// console.log('Upload is ' + progress.toFixed(2) + '% done')
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
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						console.log('File available at', downloadURL)
						setImageURL(downloadURL)
						const doc = await addDoc(collection(db, 'posts'), {
							imageURL: downloadURL,
							createdAt: serverTimestamp(),
						})
					})

					toast.success('Image uploaded successfully!')
				}
			)
		} else {
			toast.error('Upload failed!')
		}
	}

	return (
		<div>
			<input type='file' onChange={handleImageUpload} />
			{selectedImage && (
				<div>
					<p>Uploading: {selectedImage}</p>
					<p>Progress: {uploadProgress.toFixed(2)}%</p>
					<div className='loading-bar'>
						<div
							className='filled-bar'
							style={{ width: `${uploadProgress}%` }}
						></div>
					</div>
				</div>
			)}
			{imageURL && (
				<div>
					<img src={imageURL} alt='Uploaded' className='w-80 h-auto' />
				</div>
			)}
		</div>
	)
}

export default ImageUploadComponent
