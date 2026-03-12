// 강의 카테고리
console.log('---------------------category.js 로딩됨');
const subCategoryData = {
	company: {
		언어교육: [
			'영어회화',
			'비즈니스 영어',
			'영어 자격증',
			'중국어회화',
			'중국어 자격증',
			'일본어회화',
			'비즈니스 일본어',
			'일본어 자격증',
			'제2외국어',
		],
		직무교육: [
			'AI/인공지능',
			'프로그래밍',
			'데이터사이언스',
			'리더십/커뮤니케이션',
			'영업/서비스',
			'비즈니스/기획',
			'업무 생산성',
			'마케팅',
			'디자인',
			'영상/미디어',
		],
	},
	university: ['취업/창업', '진로/적성', '논문/영어논문', '전공심화', 'AI/인공지능', '프로그래밍', '마케팅', '디자인', '영어회화', '영어 자격증'],
	highschool: ['진로/적성', '취업/창업', 'AI/인공지능', '프로그래밍', '디자인', '인성/자아', '사회/경제', '인문학/교양', '영어회화', '영어 자격증'],
	elementary: ['영어', '국어', '진로/적성', 'AI/인공지능', '프로그래밍', '인성/자아', '인문학/교양', '개념/지식', '과학/탐구', '환경/안전교육'],
};

document.addEventListener('DOMContentLoaded', () => {
	// 카테고리
	const mainSelect = document.getElementById('category_main');
	const midSelect = document.getElementById('category_mid');
	const subSelect = document.getElementById('category_sub');
	const midSelectWrap = document.querySelector('.category_mid_wrap');

	midSelect.style.display = 'none';
	midSelectWrap.style.display = 'none';

	// 대분류 선택
	mainSelect.addEventListener('change', (e) => {
		const selectedMain = e.target.value;

		midSelect.innerHTML = '<option value="">중분류 선택</option>';
		subSelect.innerHTML = '<option value="">소분류 선택</option>';

		// 기업교육일 경우
		if (selectedMain === 'company') {
			midSelect.style.display = 'inline-block';
			midSelectWrap.style.display = 'inline-block';

			const mids = Object.keys(subCategoryData.company);
			mids.forEach((mid) => {
				const opt = document.createElement('option');
				opt.value = mid;
				opt.textContent = mid;
				midSelect.appendChild(opt);
			});
		} else if (subCategoryData[selectedMain]) {
			midSelectWrap.style.display = 'none';

			subCategoryData[selectedMain].forEach((sub) => {
				const opt = document.createElement('option');
				opt.value = sub;
				opt.textContent = sub;
				subSelect.appendChild(opt);
			});
		}
	});

	midSelect.addEventListener('change', (e) => {
		const selectedMid = e.target.value;
		const subs = subCategoryData.company[selectedMid] || [];

		subSelect.innerHTML = '<option value="">소분류 선택</option>';

		subs.forEach((sub) => {
			const opt = document.createElement('option');
			opt.value = sub;
			opt.textContent = sub;
			subSelect.appendChild(opt);
		});
	});

	// 썸네일 등록
	const inputs = document.querySelectorAll('.thumbnail_file');

	inputs.forEach((input) => {
		input.addEventListener('change', (e) => {
			const file = e.target.files[0];
			if (!file) return;

			const td = e.target.closest('td');
			const thumbPreview = td.querySelector('.thumb-preview');
			const previewImg = thumbPreview.querySelector('img');

			const objectURL = URL.createObjectURL(file);
			previewImg.src = objectURL;

			input.closest('label').style.display = 'none';
			thumbPreview.style.display = 'flex';

			previewImg.addEventListener('click', () => {
				input.click();
			});
		});
	});

	// // 파일 또는 링크 선택 시 토글
	// const bookTypeRadios = document.querySelectorAll('input[name="book_type"]');
	// const bookLinkInput = document.querySelector('.book-link');
	// const handoutFile = document.querySelector('.handout-file');
	// const downloadLink = document.querySelector('.download-link a');

	// bookTypeRadios.forEach((radio) => {
	// 	radio.addEventListener('change', () => {
	// 		if (radio.value === 'link' && radio.checked) {
	// 			handoutFile.closest('label').style.display = 'none';
	// 			bookLinkInput.style.display = 'inline-block';
	// 		} else {
	// 			handoutFile.closest('label').style.display = 'inline-block';
	// 			bookLinkInput.style.display = 'none';
	// 		}
	// 	});
	// });

	// // 핸드아웃 파일 첨부 시 다운로드 링크 표시
	// handoutFile.addEventListener('change', (e) => {
	// 	const file = e.target.files[0];
	// 	if (file) {
	// 		const url = URL.createObjectURL(file);
	// 		downloadLink.href = url;
	// 		downloadLink.textContent = `${file.name} 다운로드`;
	// 		downloadLink.parentElement.style.display = 'block';
	// 	}
	// });
});
