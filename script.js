const textH1 = [
	'Spacious living rooms',
	'Scandinavian workspaces',
	'European flavour',
];

const textP = [
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, repellendus? Provident sequi maximre magni sunt natus soluta Ipsum aberror labore veniam ullam atque,placeat illum quibusdam .',
	'A illum tempore soluta in eligendi nequepariatur consequuntur, aliquam voluptas nulla et quos eum ipsa, quibusdam consequatur voluptate, modiquia deleniti.',
	'Odio sint minima fugiat voluptate dolorem, voluptatum dolor possimus distinctio itaque ab commodi veniam praesentium est ad?',
];

const roomImages = ['./img/img1.jpg', './img/img2.jpg', './img/img3.jpg'];

const bgColors = ['lightblue', 'lightcoral', 'lightgreen'];

const heroRightTopText = [
	'Explore the living rooms',
	'Explore the workspaces',
	'Explore the workplaces',
];

const productImages = [
	'./img/product1.png',
	'./img/product2.png',
	'./img/product3.png',
];

const productTitles = ['Design chair', 'Wood chair', 'Dream sofa'];

const indicatorCurrent = document.getElementById('indicator-current');
const indicatorCounter = document.getElementById('indicator-counter');
const h1Container = document.getElementById('h1-container');
const pContainer = document.getElementById('p-container');
const text = document.getElementById('text');
const heroMiddle = document.getElementById('hero-middle');
const topContainer = document.getElementById('topContainer');
const topTextContainer = document.getElementById('top-text-container');
const imagesContainer = document.getElementById('images-container');
const titleContainer = document.getElementById('title-container');
let current = 0;
let playing = false;

indicatorCounter.innerHTML = `0${roomImages.length}.`;
imagesContainer.childNodes[1].style.transform = 'translateY(-50%)';

var menuToggler = document.getElementById('menu-toggler');
var isOpen = false;
var mainNav = document.getElementById('main-nav');

menuToggler.addEventListener('click', () => {
	if (isOpen) {
		isOpen = false;
		mainNav.style.transform = 'translateX(-100%)';
	} else {
		isOpen = true;
		mainNav.style.transform = 'translateX(0%)';
	}
});

const go = (direction) => {
	if (isOpen) {
		isOpen = false;
		mainNav.style.transform = 'translateX(-100%)';
	}

	if (!playing) {
		playing = true;

		if (current + direction < 0) {
			current = roomImages.length - 1;
		} else if (current + direction >= roomImages.length) {
			current = 0;
		} else {
			current += direction;
		}

		indicatorCurrent.innerHTML = `0${current + 1}.`;

		const currentTextH1 = textH1[current];
		const currentTextP = textP[current];
		const currentRoomImage = roomImages[current];
		const currentBg = bgColors[current];
		const currentHeroRightTopText = heroRightTopText[current];
		const currentProductImage = productImages[current];
		const currentProductTitle = productTitles[current];

		const nextTextH1 = document.createElement('h1');
		const nextTextP = document.createElement('p');
		const nextRoomImage = document.createElement('img');
		const nextBgColor = document.createElement('div');
		const nextHeroRightTopText = document.createElement('p');
		const nextHeroRightTopTextSpan = document.createElement('span');
		const nextProductImage = document.createElement('img');
		const nextProductTitle = document.createElement('p');

		var newSvg = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'svg'
		);
		newSvg.setAttribute('width', '24');
		newSvg.setAttribute('height', '24');
		newSvg.setAttribute('viewBox', '0 0 24 24');
		var newPath = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		newPath.setAttribute('d', 'M24 11.871l-5-4.871v3h-19v4h19v3z');
		newSvg.appendChild(newPath);

		nextTextH1.innerHTML = currentTextH1;
		nextTextP.innerHTML = currentTextP;
		nextRoomImage.src = currentRoomImage;
		nextProductImage.src = currentProductImage;
		nextProductTitle.innerHTML = currentProductTitle;
		nextProductTitle.className = 'title';
		nextBgColor.className = 'bg';
		nextHeroRightTopText.innerHTML = currentHeroRightTopText;

		heroMiddle.insertBefore(nextRoomImage, heroMiddle.firstChild);
		imagesContainer.insertBefore(
			nextProductImage,
			imagesContainer.firstChild
		);
		titleContainer.insertBefore(nextProductTitle, titleContainer.firstChild);

		nextHeroRightTopText.appendChild(nextHeroRightTopTextSpan);
		nextHeroRightTopTextSpan.appendChild(newSvg);
		topTextContainer.insertBefore(
			nextHeroRightTopText,
			topTextContainer.firstChild
		);

		topContainer.insertBefore(nextBgColor, topContainer.firstChild);
		h1Container.insertBefore(nextTextH1, h1Container.firstChild);
		pContainer.insertBefore(nextTextP, pContainer.firstChild);

		let twoRoomImages = document.querySelectorAll('.hero-middle img');
		let twoProductImages = document.querySelectorAll('#images-container img');
		let twoProductTitles = document.querySelectorAll('#title-container p');
		let twoTextsTop = document.querySelectorAll('#top-text-container p');
		let twoBgImages = document.querySelectorAll('#topContainer .bg');
		let twoH1Texts = document.querySelectorAll('#h1-container h1');
		let twoPTexts = document.querySelectorAll('#p-container p');

		if (direction === 1) {
			nextRoomImage.style.transform = 'translateX(-100%)';

			nextProductImage.style.transform =
				'translateX(-100%) translateY(-50%)';

			nextProductTitle.style.transform = 'translateX(-10%)';
			nextProductTitle.style.opacity = 0;

			nextHeroRightTopText.style.opacity = 0;
			nextHeroRightTopText.style.position = 'absolute';
			nextHeroRightTopText.style.bottom = 0;

			nextBgColor.style.backgroundColor = currentBg;
			nextBgColor.style.transform = 'translateX(-100%)';

			nextTextH1.style.transform = 'translateX(-10%)';
			nextTextH1.style.opacity = 0;
			nextTextP.style.transform = 'translateX(-10%)';
			nextTextP.style.opacity = 0;

			var tlRoomImageNext = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
			});

			tlRoomImageNext
				.add({
					targets: twoRoomImages[0],
					translateX: ['-100%', 0],
					scale: [1.5, 1.0],
				})
				.add(
					{
						targets: twoRoomImages[1],
						translateX: [0, '100%'],
						complete: () => {
							heroMiddle.removeChild(heroMiddle.lastElementChild);
						},
					},
					'-=1000'
				);

			var tlProductImagesNext = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
				delay: anime.stagger(150),
			});

			tlProductImagesNext
				.add({
					targets: [twoBgImages[0], twoProductImages[0]],
					translateX: ['-100%', 0],
					duration: 1300,
				})
				.add(
					{
						targets: [twoBgImages[1], twoProductImages[1]],
						translateX: [0, '100%'],
						complete: () => {
							playing = false;
							imagesContainer.removeChild(
								imagesContainer.lastElementChild
							);
							topContainer.removeChild(twoBgImages[1]);
						},
					},
					'-=1150'
				);

			var tlProductTitleNext = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
			});

			tlProductTitleNext
				.add({
					targets: [twoProductTitles[0], twoH1Texts[0], twoPTexts[0]],
					translateX: ['-10%', 0],
					opacity: [0, 1],
				})
				.add(
					{
						targets: [twoProductTitles[1], twoH1Texts[1], twoPTexts[1]],
						translateX: [0, '10%'],
						opacity: [1, 0],
						complete: () => {
							titleContainer.removeChild(
								titleContainer.lastElementChild
							);
							h1Container.removeChild(twoH1Texts[1]);
							pContainer.removeChild(twoPTexts[1]);
						},
					},
					'-=1000'
				);

			var tlTextTopNext = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
			});

			tlTextTopNext
				.add({
					targets: twoTextsTop[0],
					opacity: [0, 1],
					delay: 500,
				})
				.add(
					{
						targets: twoTextsTop[1],
						translateX: [0, '10%'],
						opacity: [1, 0],
					},
					'-=1000'
				);
		} else {
			nextRoomImage.style.transform = 'translateX(100%)';
			nextProductImage.style.transform = 'translateX(100%) translateY(-50%)';
			nextProductTitle.style.transform = 'translateX(10%)';
			nextProductTitle.style.opacity = 0;

			nextBgColor.style.backgroundColor = currentBg;
			nextBgColor.style.transform = 'translateX(100%)';

			nextHeroRightTopText.style.opacity = 0;
			nextHeroRightTopText.style.position = 'absolute';
			nextHeroRightTopText.style.bottom = 0;

			nextTextH1.style.transform = 'translateX(10%)';
			nextTextH1.style.opacity = 0;

			nextTextP.style.transform = 'translateX(10%)';
			nextTextP.style.opacity = 0;

			var tlRoomImagePrev = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
			});

			tlRoomImagePrev
				.add({
					targets: twoRoomImages[0],
					translateX: ['100%', 0],
					scale: [1.5, 1.0],
				})
				.add(
					{
						targets: twoRoomImages[1],
						translateX: [0, '-100%'],
						complete: () => {
							heroMiddle.removeChild(heroMiddle.lastElementChild);
						},
					},
					'-=1000'
				);

			var tlProductImagesPrev = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
				delay: anime.stagger(150),
			});

			tlProductImagesPrev
				.add({
					targets: [twoBgImages[0], twoProductImages[0]],
					translateX: ['100%', 0],
					duration: 1300,
				})
				.add(
					{
						targets: [twoBgImages[1], twoProductImages[1]],
						translateX: [0, '-100%'],
						complete: () => {
							playing = false;
							imagesContainer.removeChild(
								imagesContainer.lastElementChild
							);
							topContainer.removeChild(twoBgImages[1]);
						},
					},
					'-=1150'
				);

			var tlProductTitlePrev = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
			});

			tlProductTitlePrev
				.add({
					targets: [twoProductTitles[0], twoH1Texts[0], twoPTexts[0]],
					translateX: ['10%', 0],
					opacity: [0, 1],
				})
				.add(
					{
						targets: [twoProductTitles[1], twoH1Texts[1], twoPTexts[1]],
						translateX: [0, '-10%'],
						opacity: [1, 0],
						complete: () => {
							titleContainer.removeChild(
								titleContainer.lastElementChild
							);
							h1Container.removeChild(h1Container.lastElementChild);
							pContainer.removeChild(pContainer.lastElementChild);
						},
					},
					'-=1000'
				);

			var tlTextTopNext = anime.timeline({
				duration: 1000,
				easing: 'easeInOutQuart',
			});

			tlTextTopNext
				.add({
					targets: twoTextsTop[0],
					opacity: [0, 1],
				})
				.add(
					{
						targets: twoTextsTop[1],
						translateX: [0, '10%'],
						opacity: [1, 0],
						complete: () => {
							topTextContainer.removeChild(
								topTextContainer.lastElementChild
							);
						},
					},
					'-=1000'
				);
		}
	}
};
