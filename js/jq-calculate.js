(function () {

	//Начало аккордиона на телефоне
	var shouldReload = false;

	if ($(window).width() > 767.98) {
		$(".wrap-calculator").slideDown().removeClass("close-calc-width-767").css("display", "flex");
		//$(".wrap-calculator").slideDown().removeClass("close-calc-width-767").addClass("d-flex");
		shouldReload = true;
	}

	$(".calculator-button-wrap").click(function() {
		if ($(window).width() <= 767.98) {
			if ($("#open_calc").hasClass("visible")) {
				$(".arrow-button").addClass("rotate");
				$("#open_calc").removeClass("visible").addClass("unvisible");
				$("#close_calc").removeClass("unvisible").addClass("visible");
				$("section.calculator").addClass("light");
				$(".wrap-calculator").slideDown().removeClass("close-calc-width-767").css("display", "flex");
				//$(".wrap-calculator").slideDown().removeClass("close-calc-width-767").addClass("d-flex");
				shouldReload = false;
			} else {
				$(".arrow-button").removeClass("rotate");
				$("section.calculator").removeClass("light");
				$("#open_calc").removeClass("unvisible").addClass("visible");
				$("#close_calc").removeClass("visible").addClass("unvisible");
				$(".wrap-calculator").slideUp().addClass("close-calc-width-767");
				//$(".wrap-calculator").slideUp().addClass("close-calc-width-767").removeClass("d-flex");
				shouldReload = true;
			}
		}
	});

	$(window).resize(function() {
		if (shouldReload && $(window).width() > 767.98) {
		location.reload(); // Оновити сторінку
		}
	});
	//Конец аккордиона на телефоне

	// =========   АДРЕСИ ========= //

	//----------------------------Робота з ДОМ

	//Блок 1, адреси

	const input_city_1 = $('#city');
	const input_street_1 = $('#street');

	const selectCityWrap_1 = $('#select_city_1_wrap');
	const selectStreetWrap_1 = $('#select_street_1_wrap');

	const list_city_1 = $('#list_city_1');
	const list_street_1 = $('#list_street_1');

	let allCity_1 = [];
	let allStreet_1 = [];
	let cityRef_1 = null;
	let city_1 = '';
	let street_1 = '';
	let building_1 = '';
	let building_2 = '';
	let building_3 = '';
	let building_4 = '';
	let building_5 = '';
	let number = '';

	input_city_1.on('input', function (event) {
		// код обробки події onChange
		const inputCity = event.target.value;
		searchFirstCityFunc(inputCity)
		getFinalyFirstCity(event);
	});

	input_street_1.on('input', function (event) {
		// код обробки події onChange
		const inputStreet = event.target.value;
		serchFirstStreetFunc(inputStreet);
		getFinalyFirstStreet(event);
	});

	// для відправки в телеграм бот 
	$('#house').on('input', function() {
		building_1 = $(this).val();
	});
	$('#house2').on('input', function() {
		building_2 = $(this).val();
	});
	$('#house3').on('input', function() {
		building_3 = $(this).val();
	});
	$('#house4').on('input', function() {
		building_4 = $(this).val();
	});
	$('#house5').on('input', function() {
		building_5 = $(this).val();
	});
	$('#calc-phone').on('input', function() {
		number = $(this).val();
	});


	//--------------Основна логіка
	
	// Додати обробник події на список вибору міст
	list_city_1.on('click', 'li', function() {
	
	// Отримати текст елемента li
	const selectedCityStart = $(this).text();
  
	// Встановити текст в поле input
	input_city_1.val(selectedCityStart);
	city_1 = selectedCityStart;
	
	// Зберегти значення Ref в змінну
	const selectedOption = list_city_1.find(`li:contains(${selectedCityStart})`);
	if (selectedOption.length) {
	  cityRef_1 = selectedOption.data('id');
	}
  
	// Очистити список вибору
	list_city_1.empty();
	});

	// Додати обробник події на список вибору вулиць
	list_street_1.on('click', 'li', function() {
	// Отримати текст елемента li
	const selectedStreetStart = $(this).text();

	// Встановити текст в поле input
	input_street_1.val(selectedStreetStart);
	street_1 = selectedStreetStart;

	// Зберегти значення Ref в змінну
	const selectedOption = list_street_1.find(`li:contains(${selectedStreetStart})`);
	if (selectedOption.length) {
	streetRef_1 = selectedOption.data('id');
	}

	// Очистити список вибору
	list_street_1.empty();
	});

	const craeteFirstCityList = () => {
		list_city_1.empty(); // очищуємо список вибору
		if (allCity_1.length) {
			$.each(allCity_1, function(index, name) { // для кожного елемента в масиві allCity_1
				const li = $('<li>', { // створити елемент li
					text: name.Present,
					'data-id': name.Ref,
					class: 'option_list-item'
				});
				list_city_1.append(li); // додати li до списку вибору
			});
		}
		selectCityWrap_1.append(list_city_1); // додати список вибору до сторінки
	};

	const craeteFirstStreetList = () => {
		list_street_1.empty(); // очищуємо список вибору
		if (allStreet_1.length) {
			$.each(allStreet_1, function(index, stret) { // для кожного елемента в масиві allStreet_1
				const li = $('<li>', { // створити елемент li
					text: stret.Present,
					class: 'option_list-item'
				});
				list_street_1.append(li); // додати li до списку вибору
			});
		}
		selectStreetWrap_1.append(list_street_1); // додати список вибору до сторінки
	};
	
	const getFinalyFirstCity = (event) => {
		const selectedOption = list_city_1.find(`li:contains(${event.target.value})`);
		if (selectedOption.length) {
			cityRef_1 = selectedOption.data('id');
		}
		city_1 = event.target.value;
	};
	
	const getFinalyFirstStreet = (event) => {
		street_1 = event.target.value;
	};

	//------Функції запитів

	const searchFirstCityFunc = async (inputCity) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlements",
			"methodProperties": {
				"CityName": `${inputCity}`,
				"Limit": "550",
				"Page": "1"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(obj)
		});

		const { data } = response;

		if (data.length !== 0) {
			data.forEach((item) => {
				allCity_1.splice(0, allCity_1.length);
				item.Addresses.forEach((el) => {
					allCity_1.push(el);
				});
			});
			craeteFirstCityList();
		}
		return data;
	};

	const serchFirstStreetFunc = async (inputStreet) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlementStreets",
			"methodProperties": {
				"StreetName": `${inputStreet}`,
				"SettlementRef": `${cityRef_1}`,
				"Limit": "50"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			method: 'POST',
			data: JSON.stringify(obj),
			dataType: 'json'
		});

		const { data } = response;

		if (data.length != 0) {
			data.forEach((item) => {
				allStreet_1.splice(0, allStreet_1.length);
				item.Addresses.forEach((el) => {
					allStreet_1.push(el)
				})
			})
			craeteFirstStreetList();
		}
		return data;
	};

// Блок 2, адреси

	const input_city_2 = $('#city2');
	const input_street_2 = $('#street2');

	const selectCityWrap_2 = $('#select_city_2_wrap');
	const selectStreetWrap_2 = $('#select_street_2_wrap');

	const list_city_2 = $('#list_city_2');
	const list_street_2 = $('#list_street_2');
	
	let allCity_2 = [];
	let allStreet_2 = [];
	let cityRef_2 = null;
	let city_2 = '';
	let street_2 = '';

	input_city_2.on('input', function (event) {
		// код обробки події onChange
		const inputCity = event.target.value;
		searchSecondCityFunc(inputCity)
		getFinalySecondCity(event);
	});

	input_street_2.on('input', function (event) {
		// код обробки події onChange
		const inputStreet = event.target.value;
		serchSecondStreetFunc(inputStreet);
		getFinalySecondStreet(event);
	});
 
	//--------------Основна логіка
	
	// Додати обробник події на список вибору міст
	list_city_2.on('click', 'li', function() {
	
	// Отримати текст елемента li
	const selectedCityStart = $(this).text();
  
	// Встановити текст в поле input
	input_city_2.val(selectedCityStart);
	city_2 = selectedCityStart;
  
	// Зберегти значення Ref в змінну
	const selectedOption = list_city_2.find(`li:contains(${selectedCityStart})`);
	if (selectedOption.length) {
	  cityRef_2 = selectedOption.data('id');
	}
  
	// Очистити список вибору
	list_city_2.empty();   
	});


	// Додати обробник події на список вибору вулиць
	list_street_2.on('click', 'li', function() {
	// Отримати текст елемента li
	const selectedStreetStart = $(this).text();

	// Встановити текст в поле input
	input_street_2.val(selectedStreetStart);
	street_2 = selectedStreetStart;

	// Зберегти значення Ref в змінну
	const selectedOption = list_street_2.find(`li:contains(${selectedStreetStart})`);
	if (selectedOption.length) {
	streetRef_2 = selectedOption.data('id');
	}

	// Очистити список вибору
	list_street_2.empty();
	});


	const craeteSecondCityList = () => {
		list_city_2.empty(); // очищуємо список вибору
		if (allCity_2.length) {
			$.each(allCity_2, function(index, name) { // для кожного елемента в масиві allCity_2
				const li = $('<li>', { // створити елемент li
					text: name.Present,
					'data-id': name.Ref,
					class: 'option_list-item'
				});
				list_city_2.append(li); // додати li до списку вибору
			});
		}
		selectCityWrap_2.append(list_city_2); // додати список вибору до сторінки
	};
	
	const craeteSecondStreetList = () => {
		list_street_2.empty(); // очищуємо список вибору
		if (allStreet_2.length) {
			$.each(allStreet_2, function(index, stret) { // для кожного елемента в масиві allStreet_2
				const li = $('<li>', { // створити елемент li
					text: stret.Present,
					class: 'option_list-item'
				});
				list_street_2.append(li); // додати li до списку вибору
			});
		}
		selectStreetWrap_2.append(list_street_2); // додати список вибору до сторінки
	};
	
	const getFinalySecondCity = (event) => {
		const selectedOption = list_city_2.find(`li:contains(${event.target.value})`);
		if (selectedOption.length) {
			cityRef_2 = selectedOption.data('id');
		}
		city_2 = event.target.value;
	};
	
	const getFinalySecondStreet = (event) => {
		street_2 = event.target.value;
	};

	//------Функції запитів

	const searchSecondCityFunc = async (inputCity) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlements",
			"methodProperties": {
				"CityName": `${inputCity}`,
				"Limit": "550",
				"Page": "1"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(obj)
		});

		const { data } = response;

		if (data.length !== 0) {
			data.forEach((item) => {
				allCity_2.splice(0, allCity_2.length);
				item.Addresses.forEach((el) => {
					allCity_2.push(el);
				});
			});
			craeteSecondCityList();
		}
		return data;
	};

	const serchSecondStreetFunc = async (inputStreet) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlementStreets",
			"methodProperties": {
				"StreetName": `${inputStreet}`,
				"SettlementRef": `${cityRef_2}`,
				"Limit": "50"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			method: 'POST',
			data: JSON.stringify(obj),
			dataType: 'json'
		});

		const { data } = response;

		if (data.length != 0) {
			data.forEach((item) => {
				allStreet_2.splice(0, allStreet_2.length);
				item.Addresses.forEach((el) => {
					allStreet_2.push(el)
				})
			})
			craeteSecondStreetList();
		}
		return data;
	};




	//---Блок 3, адреси

	const input_city_3 = $('#city3');
	const input_street_3 = $('#street3');

	const selectCityWrap_3 = $('#select_city_3_wrap');
	const selectStreetWrap_3 = $('#select_street_3_wrap');

	const list_city_3 = $('#list_city_3');
	const list_street_3 = $('#list_street_3');
	
	let allCity_3 = [];
	let allStreet_3 = [];
	let cityRef_3 = null;
	let city_3 = '';
	let street_3 = '';
	
	input_city_3.on('input', function (event) {
		// код обробки події onChange
		const inputCity = event.target.value;
		searchThirdCityFunc(inputCity)
		getFinalyThirdCity(event);
	});

	input_street_3.on('input', function (event) {
		// код обробки події onChange
		const inputStreet = event.target.value;
		serchThirdStreetFunc(inputStreet);
		getFinalyThirdStreet(event);
	});
 


	//--------------Основна логіка
	
	// Додати обробник події на список вибору міст
	list_city_3.on('click', 'li', function() {

	// Отримати текст елемента li
	const selectedCityStart = $(this).text();
  
	// Встановити текст в поле input
	input_city_3.val(selectedCityStart);
	city_3 = selectedCityStart;
  
	// Зберегти значення Ref в змінну
	const selectedOption = list_city_3.find(`li:contains(${selectedCityStart})`);
	if (selectedOption.length) {
	  cityRef_3 = selectedOption.data('id');
	}
  
	// Очистити список вибору
	list_city_3.empty();
	});


	// Додати обробник події на список вибору вулиць
	list_street_3.on('click', 'li', function() {
	// Отримати текст елемента li
	const selectedStreetStart = $(this).text();

	// Встановити текст в поле input
	input_street_3.val(selectedStreetStart);
	street_3 = selectedStreetStart;

	// Зберегти значення Ref в змінну
	const selectedOption = list_street_3.find(`li:contains(${selectedStreetStart})`);
	if (selectedOption.length) {
	streetRef_3 = selectedOption.data('id');
	}

	// Очистити список вибору
	list_street_3.empty();
	});

	const craeteThirdCityList = () => {
		list_city_3.empty(); // очищуємо список вибору
		if (allCity_3.length) {
			$.each(allCity_3, function(index, name) { // для кожного елемента в масиві allCity_3
				const li = $('<li>', { // створити елемент li
					text: name.Present,
					'data-id': name.Ref,
					class: 'option_list-item'
				});
				list_city_3.append(li); // додати li до списку вибору
			});
		}
		selectCityWrap_3.append(list_city_3); // додати список вибору до сторінки
	};
	
	const craeteThirdStreetList = () => {
		list_street_3.empty(); // очищуємо список вибору
		if (allStreet_3.length) {
			$.each(allStreet_3, function(index, stret) { // для кожного елемента в масиві allStreet_3
				const li = $('<li>', { // створити елемент li
					text: stret.Present,
					class: 'option_list-item'
				});
				list_street_3.append(li); // додати li до списку вибору
			});
		}
		selectStreetWrap_3.append(list_street_3); // додати список вибору до сторінки
	};
	
	const getFinalyThirdCity = (event) => {
		const selectedOption = list_city_3.find(`li:contains(${event.target.value})`);
		if (selectedOption.length) {
			cityRef_3 = selectedOption.data('id');
		}
		city_3 = event.target.value;
	};
	
	const getFinalyThirdStreet = (event) => {
		street_3 = event.target.value;
	};

	//------Функції запитів

	const searchThirdCityFunc = async (inputCity) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlements",
			"methodProperties": {
				"CityName": `${inputCity}`,
				"Limit": "550",
				"Page": "1"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(obj)
		});

		const { data } = response;

		if (data.length !== 0) {
			data.forEach((item) => {
				allCity_3.splice(0, allCity_3.length);
				item.Addresses.forEach((el) => {
					allCity_3.push(el);
				});
			});
			craeteThirdCityList();
		}
		return data;
	};

	const serchThirdStreetFunc = async (inputStreet) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlementStreets",
			"methodProperties": {
				"StreetName": `${inputStreet}`,
				"SettlementRef": `${cityRef_3}`,
				"Limit": "50"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			method: 'POST',
			data: JSON.stringify(obj),
			dataType: 'json'
		});

		const { data } = response;

		if (data.length != 0) {
			data.forEach((item) => {
				allStreet_3.splice(0, allStreet_3.length);
				item.Addresses.forEach((el) => {
					allStreet_3.push(el)
				})
			})
			craeteThirdStreetList();
		}
		return data;
	};


	//Блок 4, адреси

	const input_city_4 = $('#city4');
	const input_street_4 = $('#street4');

	const selectCityWrap_4 = $('#select_city_4_wrap');
	const selectStreetWrap_4 = $('#select_street_4_wrap');

	const list_city_4 = $('#list_city_4');
	const list_street_4 = $('#list_street_4');

	let allCity_4 = [];
	let allStreet_4 = [];
	let cityRef_4 = null;
	let city_4 = '';
	let street_4 = '';

	input_city_4.on('input', function (event) {
		// код обробки події onChange
		const inputCity = event.target.value;
		searchQuarterCityFunc(inputCity)
		getFinalyQuarterCity(event);
	});

	input_street_4.on('input', function (event) {
		// код обробки події onChange
		const inputStreet = event.target.value;
		serchQuarterStreetFunc(inputStreet);
		getFinalyQuarterStreet(event);
	});

	//--------------Основна логіка
	
	// Додати обробник події на список вибору міст
	list_city_4.on('click', 'li', function() {

	// Отримати текст елемента li
	const selectedCityStart = $(this).text();
  
	// Встановити текст в поле input
	input_city_4.val(selectedCityStart);
	city_4 = selectedCityStart;
  
	// Зберегти значення Ref в змінну
	const selectedOption = list_city_4.find(`li:contains(${selectedCityStart})`);
	if (selectedOption.length) {
	  cityRef_4 = selectedOption.data('id');
	}
  
	// Очистити список вибору
	list_city_4.empty();
	});


	// Додати обробник події на список вибору вулиць
	list_street_4.on('click', 'li', function() {
	// Отримати текст елемента li
	const selectedStreetStart = $(this).text();

	// Встановити текст в поле input
	input_street_4.val(selectedStreetStart);
	street_4 = selectedStreetStart;

	// Зберегти значення Ref в змінну
	const selectedOption = list_street_4.find(`li:contains(${selectedStreetStart})`);
	if (selectedOption.length) {
	streetRef_4 = selectedOption.data('id');
	}

	// Очистити список вибору
	list_street_4.empty();
	});

	const craeteQuarterCityList = () => {
		list_city_4.empty(); // очищуємо список вибору
		if (allCity_4.length) {
			$.each(allCity_4, function(index, name) { // для кожного елемента в масиві allCity_4
				const li = $('<li>', { // створити елемент li
					text: name.Present,
					'data-id': name.Ref,
					class: 'option_list-item'
				});
				list_city_4.append(li); // додати li до списку вибору
			});
		}
		selectCityWrap_4.append(list_city_4); // додати список вибору до сторінки
	};
	
	const craeteQuarterStreetList = () => {
		list_street_4.empty(); // очищуємо список вибору
		if (allStreet_4.length) {
			$.each(allStreet_4, function(index, stret) { // для кожного елемента в масиві allStreet_4
				const li = $('<li>', { // створити елемент li
					text: stret.Present,
					class: 'option_list-item'
				});
				list_street_4.append(li); // додати li до списку вибору
			});
		}
		selectStreetWrap_4.append(list_street_4); // додати список вибору до сторінки
	};
	
	const getFinalyQuarterCity = (event) => {
		const selectedOption = list_city_4.find(`li:contains(${event.target.value})`);
		if (selectedOption.length) {
			cityRef_4 = selectedOption.data('id');
		}
		city_4 = event.target.value;
	};
	
	const getFinalyQuarterStreet = (event) => {
		street_4 = event.target.value;
	};

	//------Функції запитів

	const searchQuarterCityFunc = async (inputCity) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlements",
			"methodProperties": {
				"CityName": `${inputCity}`,
				"Limit": "550",
				"Page": "1"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(obj)
		});

		const { data } = response;

		if (data.length !== 0) {
			data.forEach((item) => {
				allCity_4.splice(0, allCity_4.length);
				item.Addresses.forEach((el) => {
					allCity_4.push(el);
				});
			});
			craeteQuarterCityList();
		}
		return data;
	};

	const serchQuarterStreetFunc = async (inputStreet) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlementStreets",
			"methodProperties": {
				"StreetName": `${inputStreet}`,
				"SettlementRef": `${cityRef_4}`,
				"Limit": "50"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			method: 'POST',
			data: JSON.stringify(obj),
			dataType: 'json'
		});

		const { data } = response;

		if (data.length != 0) {
			data.forEach((item) => {
				allStreet_4.splice(0, allStreet_4.length);
				item.Addresses.forEach((el) => {
					allStreet_4.push(el)
				})
			})
			craeteQuarterStreetList();
		}
		return data;
	};

//Блок 5, адреси

	const input_city_5 = $('#city5');
	const input_street_5 = $('#street5');

	const selectCityWrap_5 = $('#select_city_5_wrap');
	const selectStreetWrap_5 = $('#select_street_5_wrap');

	const list_city_5 = $('#list_city_5');
	const list_street_5 = $('#list_street_5');

	let allCity_5 = [];
	let allStreet_5 = [];
	let cityRef_5 = null;
	let city_5 = '';
	let street_5 = '';

	input_city_5.on('input', function (event) {
		// код обробки події onChange
		const inputCity = event.target.value;
		searchFifthCityFunc(inputCity)
		getFinalyFifthCity(event);
	});

	input_street_5.on('input', function (event) {
		// код обробки події onChange
		const inputStreet = event.target.value;
		serchFifthStreetFunc(inputStreet);
		getFinalyFifthStreet(event);
	});


	//--------------Основна логіка
	
	// Додати обробник події на список вибору міст
	list_city_5.on('click', 'li', function() {

	
	// Отримати текст елемента li
	const selectedCityStart = $(this).text();
  
	// Встановити текст в поле input
	input_city_5.val(selectedCityStart);
	city_5 = selectedCityStart;
  
	// Зберегти значення Ref в змінну
	const selectedOption = list_city_5.find(`li:contains(${selectedCityStart})`);
	if (selectedOption.length) {
	  cityRef_5 = selectedOption.data('id');
	}
  
	// Очистити список вибору
	list_city_5.empty();
	});


	// Додати обробник події на список вибору вулиць
	list_street_5.on('click', 'li', function() {
	// Отримати текст елемента li
	const selectedStreetStart = $(this).text();

	// Встановити текст в поле input
	input_street_5.val(selectedStreetStart);
	street_5 = selectedStreetStart;

	// Зберегти значення Ref в змінну
	const selectedOption = list_street_5.find(`li:contains(${selectedStreetStart})`);
	if (selectedOption.length) {
	streetRef_5 = selectedOption.data('id');
	}

	// Очистити список вибору
	list_street_5.empty();
	});

	// адрес 1
	$('#city').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_1').removeClass('d-none');
		}
	});
	$('#city').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_1').removeClass('d-none');
		}
	});
	$('#list_city_1').click(function() {
		$('#list_city_1').addClass('d-none');
	});

	$('#street').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_1').removeClass('d-none');
		}
	});
	$('#street').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_1').removeClass('d-none');
		}
	});
	$('#list_street_1').click(function() {
		$('#list_street_1').addClass('d-none');
	});

	// адрес 2
	$('#city2').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_2').removeClass('d-none');
		}
	});
	$('#city2').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_2').removeClass('d-none');
		}
	});
	$('#list_city_2').click(function() {
		$('#list_city_2').addClass('d-none');
	});

	$('#street2').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_2').removeClass('d-none');  
		}
	});
	$('#street2').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_2').removeClass('d-none');
		}
	});
	$('#list_street_2').click(function() {
		$('#list_street_2').addClass('d-none');
	});

	// адрес 3
	$('#city3').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_3').removeClass('d-none');  
		}
	});
	$('#city3').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_3').removeClass('d-none');
		}
	});
	$('#list_city_3').click(function() {
		$('#list_city_3').addClass('d-none');
	});

	$('#street3').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_3').removeClass('d-none'); 
		}
	});
	$('#street3').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_3').removeClass('d-none');
		}
	});
	$('#list_street_3').click(function() {
		$('#list_street_3').addClass('d-none');
	});

	// адрес 4
	$('#city4').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_4').removeClass('d-none');
		}
	});
	$('#city4').click('input', function() {
		if ($(this).val().length >= 2) {
		$('#list_city_4').removeClass('d-none');  
		}
	});
	$('#list_city_4').click(function() {
		$('#list_city_4').addClass('d-none');
	});

	$('#street4').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_4').removeClass('d-none');  
		}
	});
	$('#street4').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_4').removeClass('d-none');
		}
	});
	$('#list_street_4').click(function() {
		$('#list_street_4').addClass('d-none');
	});

	// адрес 5
	$('#city5').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_5').removeClass('d-none');
		}
	});
	$('#city5').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_city_5').removeClass('d-none');  
		}
	});
	$('#list_city_5').click(function() {
		$('#list_city_5').addClass('d-none');
	});

	$('#street5').on('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_5').removeClass('d-none');  
		}
	});
	$('#street5').click('input', function() {
		if ($(this).val().length >= 2) {
			$('#list_street_5').removeClass('d-none');
		}
	});
	$('#list_street_5').click(function() {
		$('#list_street_5').addClass('d-none');
	});

	
	const craeteFifthCityList = () => {
		list_city_5.empty(); // очищуємо список вибору
		if (allCity_5.length) {
			$.each(allCity_5, function(index, name) { // для кожного елемента в масиві allCity_5
				const li = $('<li>', { // створити елемент li
					text: name.Present,
					'data-id': name.Ref,
					class: 'option_list-item'
				});
				list_city_5.append(li); // додати li до списку вибору
			});
		}
		selectCityWrap_5.append(list_city_5); // додати список вибору до сторінки
	};
	
	const craeteFifthStreetList = () => {
		list_street_5.empty(); // очищуємо список вибору
		if (allStreet_5.length) {
			$.each(allStreet_5, function(index, stret) { // для кожного елемента в масиві allStreet_5
				const li = $('<li>', { // створити елемент li
					text: stret.Present,
					class: 'option_list-item'
				});
				list_street_5.append(li); // додати li до списку вибору
			});
		}
		selectStreetWrap_5.append(list_street_5); // додати список вибору до сторінки
	};
	
	const getFinalyFifthCity = (event) => {
		const selectedOption = list_city_5.find(`li:contains(${event.target.value})`);
		if (selectedOption.length) {
			cityRef_5 = selectedOption.data('id');
		}
		city_5 = event.target.value;
	};
	
	const getFinalyFifthStreet = (event) => {
		street_5 = event.target.value;
	};

	//------Функції запитів

	const searchFifthCityFunc = async (inputCity) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlements",
			"methodProperties": {
				"CityName": `${inputCity}`,
				"Limit": "550",
				"Page": "1"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(obj)
		});

		const { data } = response;

		if (data.length !== 0) {
			data.forEach((item) => {
				allCity_5.splice(0, allCity_5.length);
				item.Addresses.forEach((el) => {
					allCity_5.push(el);
				});
			});
			craeteFifthCityList();
		}
		return data;
	};

	const serchFifthStreetFunc = async (inputStreet) => {
		const obj = {
			"apiKey": "e16e3cf10f091ac3a3bc5c21aa79a44d",
			"modelName": "Address",
			"calledMethod": "searchSettlementStreets",
			"methodProperties": {
				"StreetName": `${inputStreet}`,
				"SettlementRef": `${cityRef_5}`,
				"Limit": "50"
			}
		};

		const response = await $.ajax({
			url: 'https://api.novaposhta.ua/v2.0/json/',
			method: 'POST',
			data: JSON.stringify(obj),
			dataType: 'json'
		});

		const { data } = response;

		if (data.length != 0) {
			data.forEach((item) => {
				allStreet_5.splice(0, allStreet_5.length);
				item.Addresses.forEach((el) => {
					allStreet_5.push(el)
				})
			})
			craeteFifthStreetList();
		}
		return data;
	};



	
	//додаємо додаткову адресу.

	let indexInput = 2; // зберігаємо індекс останнього елемента, з якого було видалено клас d-none
	let countBtn = 0;
	// додаємо обробник події click до кнопки з id="add"
	$("#add").click(function () {
		if (addressCount < 3) {
			addressCount++;
		}
		
		// знаходимо наступний елемент, в якому потрібно видалити клас d-none
		let $address = $(".address").eq(indexInput);

		// якщо знайдений елемент існує
		if ($address.length) {
			$address.removeClass("d-none"); // видаляємо клас d-none
			indexInput++; // збільшуємо індекс на 1

			calculateSum();
		}
		countBtn++;
		if (countBtn === 4) {
			$(".help-message").removeClass("d-none");
		}
	});

	$(".close__adress").click(function () {
		$(this).parent().addClass("d-none");
		countBtn--;
		indexInput--;
		addressCount--;
		
		calculateSum();
		if (indexInput < 5) {
			$(".help-message").addClass("d-none");
		}
	});

	// закриття блоку підказок при кліку за блоком

	// адреса 1
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_city_1_wrap").length) {
		  $("#list_city_1").addClass("d-none");
		}
	});
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_street_1_wrap").length) {
		  $("#list_street_1").addClass("d-none");
		}
	});
	// адреса 2
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_city_2_wrap").length) {
		  $("#list_city_2").addClass("d-none");
		}
	});
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_street_2_wrap").length) {
		  $("#list_street_2").addClass("d-none");
		}
	});
	// адреса 3
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_city_3_wrap").length) {
		  $("#list_city_3").addClass("d-none");
		}
	});
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_street_3_wrap").length) {
		  $("#list_street_3").addClass("d-none");
		}
	});
	// адреса 4
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_city_4_wrap").length) {
		  $("#list_city_4").addClass("d-none");
		}
	});
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_street_4_wrap").length) {
		  $("#list_street_4").addClass("d-none");
		}
	});
	// адреса 5
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_city_5_wrap").length) {
		  $("#list_city_5").addClass("d-none");
		}
	});
	$(document).on("click", function(event) {
		var target = $(event.target);
		if (!target.closest("#select_street_5_wrap").length) {
		  $("#list_street_5").addClass("d-none");
		}
	});

	// =========== ОЧИЩЕННЯ ДОДАТКОВОЇ АДРЕСИ ======== //
	$("#close-2").click(function () {
		city_2 = "";
		street_2 = "";
		building_2 = "";
		$('#city2[type="text"]').val('');
		$('#street2[type="text"]').val('');
		$('#house2[type="text"]').val('');
	});
	$("#close-3").click(function () {
		city_3 = "";
		street_3 = "";
		building_3 = "";
		$('#city3[type="text"]').val('');
		$('#street3[type="text"]').val('');
		$('#house3[type="text"]').val('');
	});
	$("#close-4").click(function () {
		city_4 = "";
		street_4 = "";
		building_4 = "";
		$('#city4[type="text"]').val('');
		$('#street4[type="text"]').val('');
		$('#house4[type="text"]').val('');
	});
	$("#close-5").click(function () {
		city_5 = "";
		street_5 = "";
		building_5 = "";
		$('#city5[type="text"]').val('');
		$('#street5[type="text"]').val('');
		$('#house5[type="text"]').val('');
	});
	// =========   ВАНТАЖНИКИ ========= //

	var personCount = $(".label__mover-active").data('person');
	// перемикання грузчиків
	$(".label__mover").on("click", function () {
		$(".label__mover-active").removeClass("label__mover-active");
		$(this).addClass("label__mover-active");
		personCount = $(".label__mover-active").data('person')
	});

	let car = $(".car-selected .car-name").text();

	// =========   АВТО ========= //
	
	// вибір авто
	$(".cars-list-item").on("click", function (e) {
		$(".car-information").removeClass("car-selected");
		$(this).find(".car-information").addClass("car-selected");
		car = $(".car-selected .car-name").text();;
		$(".dropdown-cars").html(
			$(".car-selected ").parent().html()
		);
		$(".cars-list").toggleClass("cars-list-visible");
				
	});

	$(document).on('click', function(event) {
		if (!$(event.target).closest('.calc-cars').length && !$(event.target).is('.calc-cars')) {
		  $('.cars-list').removeClass("cars-list-visible")
		}
	  });
  
	
	
// =========   ГОДИНИ ========= //
	// Каунтер годин
	var timeAmount = $(".count-time .amount");
	var timeUnit = $(".count-time .unit");
	var incrementButton = $(".count-time .plus");
	var decrementButton = $(".count-time .minus");
	var minCarHours = 2;
	var minHours = 2; // Початкове значення годин
	var maxHours = 15; // Максимальне значення годин
	var amount = $('.amount').text();
	function updateDisplay() {
		timeAmount.text(minHours);
		// timeUnit.text(minHours === 1 ? "год." : "години");
	}

	function incrementHours() {
		if (minHours < maxHours) {
			minHours++;
			amount = $('.amount').text();
			updateDisplay();
			$(".warning").addClass("hidden");
		}
	}

	function decrementHours() {
		if (minHours > minCarHours) {
			minHours--;
			amount = $('.amount').text();
			updateDisplay();
		} else if ((minHours = minCarHours)) {
			$(".warning").removeClass("hidden");
			setTimeout(function () {
				$(".warning").addClass("hidden");
			}, 6000);
		}
	}

	

	$(".cars-list-item").click(function () {
		minCarHours = $(".dropdown-cars .car-name").data("minhours");
		minHours = minCarHours;
		timeAmount.text(minCarHours);
		$(".warning span").text(minCarHours);
	});

	incrementButton.on("click", incrementHours);
	decrementButton.on("click", decrementHours);

	updateDisplay();

	

// =========   КАЛЕНДАР ========= //

	new AirDatepicker('#airdatepicker',{
	autoClose: true,
	showOtherMonths: false,
	keyboardNav: false,
	minDate: new Date(),
	locale: {
		days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'],
		daysShort: ['Нед', 'Пнд', 'Вів', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		daysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
		monthsShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
		today: 'Сьогодні',
		clear: 'Очистити',
		dateFormat: 'dd.MM.yyyy',
		timeFormat: 'HH:mm',
		firstDay: 1
	  }
	})

	var newDate = '';
	$('.send').on("click", function(){
		var inputVal = $("#airdatepicker").val(); // получаем значение поля ввода
		newDate = inputVal; // сохраняем значение в переменную newDate
	});

// =========  СУМА  ========= //


	// зберігаємо всі необхідні елементи у змінні
	var labelMovers = $(".label__mover");
	var carInformation = $(".car-information");
	var plusButton = $(".plus");
	var minusButton = $(".minus");
	var addressCount = 0;
	var sumPrice = $(".sum-price");
	var additionalSum = 0;

	// функція для обрахунку суми
	function calculateSum() {
		// отримуємо необхідні значення з відповідних атрибутів
		var person = parseInt(
			labelMovers.filter(".label__mover-active").data("person")
		);
		//   var person = $('.label__mover-active').data('person');
		var personHours = parseInt(
			labelMovers.filter(".label__mover-active").data("pricehours")
		);
		var priceHours = $(".dropdown-cars .car-name").data("pricehours");
		var innings = $(".dropdown-cars .car-name").data("innings");
		var moverAddAddress = parseInt(
			labelMovers.filter(".label__mover-active").data("add-address")
		);
		var carAddAddress = $(".dropdown-cars .car-name").data("additional");

		//   var amount = parseInt($('.amount').val());
		var amount = parseInt($(".amount").text());
		if (addressCount >= 1 && addressCount <= 3) {
			additionalSum = (moverAddAddress + carAddAddress) * addressCount;
		} else {
			additionalSum = 0;
		}
		// розрахунок суми за заданою формулою
		var sum =
			person * (personHours * amount) +
			(priceHours * amount + innings) +
			additionalSum;
		// виведення суми на сторінку
		sumPrice.html(sum);
		//   var additional = $('.dropdown-cars .car-name').data('innings');	
	}

	// виклик функції для підрахунку суми при завантаженні сторінки
	calculateSum();

	// обробник події для кліку на елемент з класом 'label__mover'
	labelMovers.click(function () {
		// змінюємо клас активного елемента
		labelMovers.removeClass("label__mover-active");
		$(this).addClass("label__mover-active");

		// перераховуємо суму
		calculateSum();
	});

	// обробник події для кліку на зміну авто
	$(".cars-list-item").click(function () {
		// перераховуємо суму
		calculateSum();
	});

	// обробник події для кліку на елемент з класом 'calc-time' або кнопку з класом 'plus'
	carInformation.add(plusButton).click(function () {
		// перераховуємо суму
		calculateSum();
	});
	// обробник події для кліку на елемент з класом 'calc-time' або кнопку з класом 'minus'
	carInformation.add(minusButton).click(function () {
		// перераховуємо суму
		calculateSum();
	});

	
	// ---------------перевірка кнопки Замовити виведення помилок та додання червоних бордерів----------------

	// Отримує безліч аргументів та повертає true якщо не отримала жодного false
	function checkAllTrue(...args) {
		for (let i = 0; i < args.length; i++) {
			if (!args[i]) {
				return false;
			}
		}
		return true;
	}

	// true, якщо всі інпути із адресами заповнені
	let isNotEmptyAdressInputs;

	// true, якщо вибрані грузчики
	let isChosenMovers;

	// true, якщо вірно введений номер
	let isValidNumber = false;
	$("#calc-phone").on("input", function () {
		var inputValue = $("#calc-phone").val();
		if (inputValue.indexOf("_") !== -1 || inputValue.length < 19) {
			isValidNumber = false;
		} else {
			isValidNumber = true;
		}
	});


	// Додаю по кліку на кнопку #submitPhoneBtn клас red-input-border до пустих інпутів та видаляю клас hidden із div який виводить текст із помилкою
	$("#submitPhoneBtn").click(function () {
		let isNotEmptyAdressInputsArray = [];
		$(
			".address:not(.d-none) input:not(#house5):not(#house4):not(#house3):not(#house2):not(#house)"
		).each(function () {
			if ($(this).val() === "") {
				$(this).addClass("red-input-border");
				$(".form-sent-error-emptyInputs").removeClass("hidden");
				isNotEmptyAdressInputsArray.push(false);
			} else {
				isNotEmptyAdressInputsArray.push(true);
			}
		});
		isNotEmptyAdressInputs = checkAllTrue(...isNotEmptyAdressInputsArray);
	});

	// Знаходжу необхідні інпути
	const $inputs = $(
		".address input:not(#house5):not(#house4):not(#house3):not(#house2):not(#house)"
	);

	// Видаляю клас red-input-border із інпутів які були закриті по натисканню на кнопку .close__adress
	$(".close__adress").click(function () {
		$(this).closest(".address").find("input").removeClass("red-input-border");
		// Перевіряємо, чи залишилися пусті інпути з класом "red-input-border"
		if ($inputs.filter(".red-input-border").length === 0) {
			// Якщо не залишилося, то додаємо клас "hidden"
			$(".form-sent-error-emptyInputs").addClass("hidden");
		}
	});

	// Видаляю клас red-input-border із інпутів на який натиснув корситувач та, якщо все ОК, то видаляю текст із помилкою.
	$inputs.focus(function () {
		$(this).removeClass("red-input-border");

		// Перевіряємо, чи залишилися пусті інпути з класом "red-input-border" та чи вибрані грузчики, якщо все ОК, то видаляю текст із помилкою
		if (
			$inputs.filter(".red-input-border").length === 0 &&
			$(".label__mover-active").length !== 0
		) {
			// Якщо не залишилося, то додаємо клас "hidden"
			$(".form-sent-error-emptyInputs").addClass("hidden");
		}
	});

	// Додаю red-input-border та повідомлення із помилкою, якщо не вибрано кількість грузчиків
	$("#submitPhoneBtn").click(function () {
		let isChosenMoversArray = [];

		// перевіряємо, чи є якийсь вибраний елемент
		if ($(".label__mover-active").length == 0) {
			// якщо ні, то додаємо клас до батьківського елемента та виводджу помилку
			$(".count").addClass("red-input-border");
			$(".form-sent-error-emptyInputs").removeClass("hidden");
			isChosenMoversArray.push(false);
		} else {
			isChosenMoversArray.push(true);
		}
		isChosenMovers = checkAllTrue(...isChosenMoversArray);
	});

	// Видаляю клас red-input-border із блоку із  грузчиками та, якщо все ОК, то видаляю текст із помилкою.
	$(".label__mover").on("click", function () {
		if ($(".label__mover-active").length !== 0) {
			$(".count").removeClass("red-input-border");
		}

		// Якщо немає помилок в блоках із адресою та немає помилок в блоці із грузчиками, то видаляю текст із помилкою
		if (
			$inputs.filter(".red-input-border").length === 0 &&
			$(".label__mover-active").length !== 0
		) {
			$(".form-sent-error-emptyInputs").addClass("hidden");
		}
	});

	let formInputCurrent = false;

	// Якщо номер не вірно введений, то виводиться повідомлення із помилкою та додається червоний бордер
	$("#submitPhoneBtn").on("click", function () {
		var inputValue = $("#calc-phone").val();
		// console.log(inputValue);
		if (inputValue.indexOf("_") !== -1 || inputValue.length < 19) {
			$(".form-sent-error").removeClass("hidden");
			$("#calc-phone").addClass("red-input-border");
			formInputCurrent = false;
		} else {
			formInputCurrent = true;
			return true;
		}
	});

	// Якщо номер вірно введений, то видяляється повідомлення із помилкою
	// $("#calc-phone").on("input", function () {
	//     var inputValue = $("#calc-phone").val();
	//     if (inputValue.indexOf("_") !== -1 || inputValue.length < 19) {
	//     } else {
	//         $(".form-sent-error").addClass("hidden");
	//     }
	// });

	//Видаляю red-input-border коли користувач клікає на інпут із номером та видаляю повідомлення із помилкою
	$("#calc-phone").focus(function () {
		$("#calc-phone").removeClass("red-input-border");
		$(".form-sent-error").addClass("hidden");
	});

	// =========  ТЕЛЕГРАМ ========= //

	// Отримання типу кнопки замовлення (з калькулятору)

	$(".send").on("click", function () {
		let postCity1 = `${city_1} ${street_1} ${building_1}`;
		let postCity2 = `${city_2} ${street_2} ${building_2}`;
		let postCity3 = `${city_3} ${street_3} ${building_3}`;
		let postCity4 = `${city_4} ${street_4} ${building_4}`;
		let postCity5 = `${city_5} ${street_5} ${building_5}`;
		let postNumb = `${number}`;
		let postMovers = `${personCount}`;
		let postAmount = `${parseInt($(".amount").text())}`; /* доданні зміни */
		let postCar = `${car}`;
		let postPrice = `${sumPrice.text()}`;

		let dataType = $(".submitPhoneBtn-calc").data("type");
		let page = $('.order-items input[name="page"]').val();

		var formData = {};
		if (postCity1.trim() !== "") {
			formData.city1 = postCity1;
		}
		if (postCity2.trim() !== "") {
			formData.city2 = postCity2;
		}
		if (postCity3.trim() !== "") {
			formData.city3 = postCity3;
		}
		if (postCity4.trim() !== "") {
			formData.city4 = postCity4;
		}
		if (postCity5.trim() !== "") {
			formData.city5 = postCity5;
		}
		(formData.number = postNumb),
			(formData.postMovers = postMovers),
			(formData.postCar = postCar),
			(formData.postAmount = postAmount),
			(formData.price = postPrice);
		formData.date = newDate;
		formData.type = dataType;
		formData.page = page;

		console.log(newDate);
		console.log(postAmount);
		console.log(formData);


		
		if (isNotEmptyAdressInputs && isChosenMovers && isValidNumber) {
			$.ajax({
				type: "POST",
				url: "/js/telegram-calculate.php",
				data: formData,
				success: function (response) {
					console.log(response);
				},
				error: function (xhr, status, error) {
					console.log("AJAX error: " + status + " " + error);
				},
			});
			// ====== Кнопка Відправки======//
			// для рус
				$(this).addClass("green-btn");
				//$(".submitPhoneBtn-calc").prop("disabled", true)
				$(".submitPhoneBtn-calc").text("Отправлено");
				$(".submitPhoneBtn-calc.b-ukr").text("Відправлено");

		} else {
			$(".form-sent").addClass("hidden");
		}
	});
})();