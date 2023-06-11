'use client'

import { useState, useRef } from 'react'
import { handleImageUpload } from '@/app/util/handleImageUpload'

export default function Combo() {
	const [selectedImage, setSelectedImage] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(null)
	const [imageURL, setImageURL] = useState('')
	const [dragActive, setDragActive] = useState(false)
	// ref
	const inputRef = useRef(null)

	// handle drag events
	const handleDrag = function (e) {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true)
		} else if (e.type === 'dragleave') {
			setDragActive(false)
		}
	}

	// triggers when file is dropped
	const handleDrop = function (e) {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			console.log('e.dataTransfer.files', e.dataTransfer.files[0])
			// handleFiles(e.dataTransfer.files);
			handleImageUpload(
				e.dataTransfer.files[0],
				setSelectedImage,
				setUploadProgress,
				setImageURL
			)
		}
	}

	// triggers when file is selected with click
	const handleChange = function (e) {
		e.preventDefault()
		if (e.target.files && e.target.files[0]) {
			console.log('e.target.files', e.target.files[0])
			handleImageUpload(
				e.target.files[0],
				setSelectedImage,
				setUploadProgress,
				setImageURL
			)
			// handleFiles(e.target.files);
		}
	}

	// triggers the input when the button is clicked
	const onButtonClick = () => {
		inputRef.current.click()
	}

	return (
		<div className='w-[400px]'>
			{!imageURL && (
				<form
					className='w-full'
					id='form-file-upload'
					onDragEnter={handleDrag}
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						ref={inputRef}
						type='file'
						id='input-file-upload'
						multiple={true}
						onChange={handleChange}
					/>

					<label
						id='label-file-upload'
						htmlFor='input-file-upload'
						className={dragActive ? 'drag-active' : ''}
					>
						{uploadProgress === null ? (
							<div>
								<p>Drag and drop your file here or</p>
								<button className='upload-button' onClick={onButtonClick}>
									Upload a file
								</button>
							</div>
						) : (
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
					</label>

					{dragActive && (
						<div
							id='drag-file-element'
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						></div>
					)}
				</form>
			)}

			{imageURL && (
				<div>
					<img
						src={imageURL}
						alt='Uploaded'
						className='w-full h-auto'
						onClick={() => {
							setImageURL('')
							setUploadProgress(null)
						}}
					/>
				</div>
			)}
		</div>
	)
}
