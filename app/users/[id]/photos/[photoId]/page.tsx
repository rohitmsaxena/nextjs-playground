import React from 'react';

interface Props {
	params : { id: number, photoId: number }
}
const PhotoDetails = ({ params: {id, photoId}} : Props) => {
	return (
		<div>
			User id: {id} Photos {photoId}
		</div>
	);
};

export default PhotoDetails;
