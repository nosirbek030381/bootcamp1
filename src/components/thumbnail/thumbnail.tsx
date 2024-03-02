import Image from 'next/image';
import { image_base } from 'src/helpers/constants';
import { ThumbnailProps } from './thumbnail.props';

const Thumbnail = ({ movie }: ThumbnailProps) => {
	return (
		<div className='relative h-[330px] min-w-[200px] cursor-pointer transition duration-200 ease-out md:h-[440px] md:min-w-[292px] md:hover:scale-110'>
			<Image
				src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
				alt='Movie Image'
				fill
				sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
				className='object-cover rounded-lg'
				priority
			/>
		</div>
	);
};

export default Thumbnail;
