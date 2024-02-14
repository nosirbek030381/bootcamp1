import Image from 'next/image';
import { useEffect, useState } from 'react';
import { image_base } from 'src/helpers/constants';
import { IMovie } from 'src/interfaces/app.interface';
import { HeroProps } from './hero.props';

const Hero = ({ trending }: HeroProps): JSX.Element => {
	const [movie, setMovie] = useState<IMovie>({} as IMovie);

	useEffect(() => {
		const randomMovie = trending[Math.floor(Math.random() * trending.length)];
		setMovie(randomMovie);
	}, [trending]);

	return (
		<div>
			<div className='absolute top-0 left-0 h-[95vh] w-full'>
				<Image
					src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
					alt={'movie.title'}
					fill
					priority
					className='object-cover'
				/>
			</div>
		</div>
	);
};

export default Hero;
