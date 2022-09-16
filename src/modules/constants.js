import tamiscal from 'assets/images/tiles/tamiscal.png';
import marinAcademy from 'assets/images/tiles/ma.png';
import sanMarin from 'assets/images/tiles/sanMarin.png';
import terraLinda from 'assets/images/tiles/terraLinda.png';
import redwood from 'assets/images/tiles/redwood.png';
import novato from 'assets/images/tiles/novato.png';
import archieWilliams from 'assets/images/tiles/archie.jpeg';
import marinCatholic from 'assets/images/tiles/mc.png';
import branson from 'assets/images/tiles/branson.png';
import sanRafael from 'assets/images/tiles/sanRafael.jpeg';
import tamHigh from 'assets/images/tiles/tam.png';

let constants = {
	damping: 0.1,
	tiles: [
		{
			name: 'Tamiscal',
			imagePath: 'tamiscal.png',
			image: tamiscal,
			worth: 2,
		},
		{
			name: 'Marin Academy',
			imagePath: 'ma.png',
			image: marinAcademy,
			worth: 4,
		},
		{
			name: 'San Marin',
			imagePath: 'sanMarin.png',
			image: sanMarin,
			worth: 8,
		},
		{
			name: 'Terra Linda',
			imagePath: 'terraLinda.png',
			image: terraLinda,
			worth: 16,
		},
		{
			name: 'Redwood',
			imagePath: 'redwood.png',
			image: redwood,
			worth: 32,
		},
		{
			name: 'Novato',
			imagePath: 'novato.png',
			image: novato,
			worth: 64,
		},
		{
			name: 'Archie Williams',
			imagePath: 'archie.jpeg',
			image: archieWilliams,
			worth: 128,
		},
		{
			name: 'Marin Catholic',
			imagePath: 'mc.png',
			image: marinCatholic,
			worth: 256,
		},
		{
			name: 'San Rafael',
			imagePath: 'sanRafael.jpeg',
			image: sanRafael,
			worth: 512,
		},
		{
			name: 'Branson',
			imagePath: 'branson.png',
			image: branson,
			worth: 1024,
		},
		{
			name: 'Tam High',
			imagePath: 'tam.png',
			image: tamHigh,
			worth: 2048,
		},
	],
};

export default constants;
