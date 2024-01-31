'use client'
import React, {useState} from 'react';
import {CldImage, CldUploadWidget} from "next-cloudinary";

interface CloundinaryResults {
    public_id: string
}

const UploadPage = () => {
    const [publicId, setPublicId] = useState('')
    return (
        <>
            {publicId && <CldImage alt='my image' src={publicId} width={270} height={180}/>}
            <CldUploadWidget
                uploadPreset='jvbla4js'
                onUpload={(results, widget) => {
                    if (results.event !== 'success') return;
                    const info = results.info as CloundinaryResults
                    setPublicId(info.public_id)
                }}
            >
                {({open}) =>
                    <button
                        className='btn btn-primary'
                        onClick={() => open()}>
                        Upload
                    </button>}

            </CldUploadWidget>
        </>
    )
}

export default UploadPage