'use client'

import { useState, useRef } from 'react'
import { handleImageUpload } from '@/app/util/handleImageUpload'
import { HiOutlineTrash } from 'react-icons/hi'

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
						disabled={uploadProgress !== null}
					/>

					<label
						id='label-file-upload'
						htmlFor='input-file-upload'
						className={dragActive ? 'drag-active' : ''}
					>
						{uploadProgress === null ? (
							<div className='flex flex-col gap-4 justify-center items-center'>
								<button
									className='upload-button px-6 py-4 rounded-lg bg-purple-500 text-white'
									onClick={onButtonClick}
								>
									Upload a Fluff
								</button>
								<p>...or drag and drop an image.</p>
							</div>
						) : (
							<div className='flex flex-col items-start gap-1'>
								<p className='font-medium'>Uploading {selectedImage}</p>
								<div className='loading-bar rounded-lg border border-purple-500'>
									<div
										className='filled-bar rounded-md'
										style={{ width: `${uploadProgress}%` }}
									/>
								</div>
								<p className='text-gray-500 text-sm'>
									{uploadProgress.toFixed(1)}%
								</p>
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
				<div className='relative group'>
					<HiOutlineTrash className='w-6 h-6 text-red-500 absolute top-5 left-5 hidden group-hover:inline-block' />
					<img
						src={imageURL}
						alt='Uploaded'
						className='w-full h-[256px] object-scale-down border-2 border-dashed rounded-2xl border-[#cbd5e1] p-2 hover:!border-red-500 cursor-pointer'
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
