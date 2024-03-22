import { Button, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';

const NavMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handlerClick = (evt: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(evt.currentTarget);
	};

	const handlerClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className='md:!hidden'>
			<Button
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handlerClick}
				className={'!text-white'}
			>
				Browse
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handlerClose}
				MenuListProps={{ 'aria-labelledby': 'basic-button' }}
				className='menu'
			>
				<MenuItem>Home</MenuItem>
				<MenuItem>Movies</MenuItem>
				<MenuItem>TV Shows</MenuItem>
				<MenuItem>New</MenuItem>
				<MenuItem>Popular</MenuItem>
			</Menu>
		</div>
	);
};

export default NavMenu;
