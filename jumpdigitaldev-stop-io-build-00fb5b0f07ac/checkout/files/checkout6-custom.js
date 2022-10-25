var pageView = function (window, undefined) { // View Var Definitions
	var $ViewContainer = $('#checkoutMainContainer'),

		init_ = function () {


			$(document).find('#cart-coupon').attr('placeholder', 'Agregar Cupón');

			$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
				console.log('orderFormUpdated!', orderForm);
				changeCouponText();

				if (location.hash.indexOf('payment') > 0) {


					$('.payment-group-item').each(function () {
						$(this).parent().attr('id', $(this).attr('id') + '-wrap');
					});
					$('.payment-group-list-btn').addClass('shuffled');

				}


			});

			$(window).on('hashchange', function (e) {
				if (location.hash.indexOf('payment') > 0) {
					var paymentDataOffset = $('#payment-data').offset().top;
					$("html, body").animate({
						scrollTop: paymentDataOffset
					}, 250);
				}
			});
		},



	changeCouponText = function () {

		// Later, you can stop observing
		let interval = setInterval(function () {
			if ($('.coupon-value').length > 0) {
				$('.coupon-value').attr('placeholder', 'Agregar Cupón');
				clearInterval(interval);
			}
		}, 100);
	};

	return {
		init: init_
	}
}(window); // pageView

$(function () {
	pageView.init();
});
// pageView JS Close


(function ($) {
	$.fn.changes = function (cb, e) {
		e = e || {
			subtree: true,
			childList: true,
			characterData: true
		};
		$(this).each(function () {
			function callback(changes) {
				cb.call(node, changes, this);
			}
			var node = this;
			(new MutationObserver(callback)).observe(node, e);
		});
	};
})(jQuery);

var addressAutocomplete = function () {
	console.log('addressAutocomplete');

	function addAutocomplete() {
		$("#contenedor-direccion,.tipo-via, .street-error").remove();
		$("#ship-street").unbind("change").off("change").attr("readonly", "readonly");
		var html = "<span class='tipo-via'>Tipo de vía*</span>";
		html += "<div id='contenedor-direccion'>";
		html += "<div class='contenedor-tipo-via'>";
		html += "<select id='tipo-via'>"; // onchange='validateAddress()'
		html += '<option value="">Seleccionar tipo de vía</option>';
		html += '<option value="Avenida">Avenida</option>';
		html += '<option value="Avenida Calle">Avenida Calle</option>';
		html += '<option value="Avenida Carrera">Avenida Carrera</option>';
		html += '<option value="Calle">Calle</option>';
		html += '<option value="Carrera">Carrera</option>';
		html += '<option value="Circular">Circular</option>';
		html += '<option value="Diagonal">Diagonal</option>';
		html += '<option value="Transversal">Transversal</option>';
		html += '<option value="Autopista">Autopista</option>';
		html += '<option value="Kilometro">Kilómetro</option>';
		html += '<option value="Circunvalar">Circunvalar</option>';
		html += '<option value="Manzana">Manzana</option>';
		html += '<option value="Apartado Aéreo">Apartado Aéreo</option>';
		html += "</select>";
		html += "</div>";
		html += '<input type="text" id="numero-1" placeholder="Ej: 46C" maxlength="15" />';
		html += "<span>#</span>";
		html += '<input type="text" id="numero-2" placeholder="42A" maxlength="15" />';
		html += "<span> - </span>";
		html += '<input type="text" id="numero-3" placeholder="21" maxlength="15" />';
		html += "</div>";

		$(html).insertBefore("#ship-street");
		$('<span class="help error street-error">Este valor es requerido.</span>').insertAfter("#ship-street");
		validateChar();
		validateShipStreet();

		$(document).on('change', '#tipo-via', validateAddress);
	}

	function validateShipStreet() {
		// Check for existing address, split it and add it to the customization
		if (vtexjs.checkout.orderForm) {
			let orderFormShippingData = vtexjs.checkout.orderForm.shippingData;
			if (orderFormShippingData && orderFormShippingData.selectedAddresses != '') {
				console.log('theres a selected address, split it!');
				if (orderFormShippingData.selectedAddresses.length > 0) {
					let selectedAddress = orderFormShippingData.selectedAddresses[0].street;

					if (selectedAddress) {

						console.log('selectedAddress', selectedAddress);
						selectedAddress = selectedAddress.replace(' #', '').replace(' -', '').split(' ');
						console.log('selectedAddress', selectedAddress);

						// Prepolulate the fields
						$(document).find('#tipo-via').val(selectedAddress[0]);
						$(document).find('#numero-1').val(selectedAddress[1]);
						$(document).find('#numero-2').val(selectedAddress[2]);
						$(document).find('#numero-3').val(selectedAddress[3]);

					}
				}
			}

			if ($("#ship-street").val() !== "") {
				$("#btn-go-to-payment").removeAttr("disabled");
			}
		}
	}

	function validateAddress() {
		const tipoVia = $('#tipo-via').val();
		if (tipoVia !== "Kilometro") {
			$("#numero-1,#numero-2,#numero-3").removeAttr("disabled");
			$("#btn-go-to-payment, #ship-street").attr("disabled", 'disabled');
			var val1 = $.trim($("#tipo-via").val());
			var val2 = $.trim($("#numero-1").val());
			var val3 = $.trim($("#numero-2").val());
			var val4 = $.trim($("#numero-3").val());
			if (val1 == "") {
				$("#btn-go-to-payment,#numero-1,#numero-2,#numero-3").attr("disabled", "disabled");
				$("#numero-1,#numero-2,#numero-3").val("");
			} else $("#numero-1,#numero-2,#numero-3").removeAttr("disabled");

			var value = val1 + " " + val2 + (val3 != '' ? " # " : '') + val3 + (val4 != '' ? " - " : '') + val4;

			var input = document.getElementById("ship-street");
			var addEventValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
			addEventValue.call(input, value);
			value = new Event("input", {
				bubbles: true,
			});
			input.dispatchEvent(value);

			if (val1 == "" || val2 == "") {
				$("#ship-street").val('');
			}

			if (val1 != "" && val2 != "" && val3 != "" && val4 != "") {
				console.log('address details are complete');
				$("#btn-go-to-payment").removeAttr("disabled");
			} else if (val1 != "" || val2 != "" || val3 != "" || val4 != "") {
				console.log('address not complete yet');
				// $("#ship-street").val('');
				// $("#btn-go-to-payment").attr("disabled", "disabled");
			}
			if ($("#ship-street").val() !== "") {
				$("#ship-street").next('.error').hide();
				$("#btn-go-to-payment").removeAttr("disabled");
			} else {
				$("#ship-street").next('.error').show();
				$("#btn-go-to-payment").attr("disabled", "disabled")
			};
		} else {
			$("#numero-1,#numero-2,#numero-3").attr("disabled", "disabled");
			$("#btn-go-to-payment").removeAttr('disabled');
			$("#ship-street").removeAttr("disabled").removeAttr("readonly");
		}
	}

	function validateChar() {
		var val1 = $.trim($("#tipo-via").val());
		if (val1 == "") {
			$("#btn-go-to-payment,#numero-1,#numero-2,#numero-3").attr("disabled", "disabled");
			$("#numero-1,#numero-2,#numero-3").val("");
		} else $("#numero-1,#numero-2,#numero-3").removeAttr("disabled");
		$("#numero-1,#numero-2,#numero-3")
			.off("keyup paste")
			.on("keyup paste", function (e) {
				var alphaNumericAndSpaces = /^[a-zA-Z0-9 ]*$/;
				if (!e) var e = window.event;
				if (e.keyCode) code = e.key.charCodeAt(0);
				else if (e.which) code = e.which;
				var character = String.fromCharCode(code);
				// if they pressed esc... remove focus from field...
				if (code == 27) {
					this.blur();
					return false;
				}
				// ignore if they are press other keys
				// strange because code: 39 is the down key AND ' key...
				// and DEL also equals .
				if (character.match(alphaNumericAndSpaces)) {
					$(".help.error.street-char-error").remove();
					validateAddress();
					return true;
				} else {
					$(".help.error.street-char-error").remove();
					$("#btn-go-to-payment").attr("disabled", "disabled");
					$('<span class="help error street-char-error" style="margin-top:0;margin-bottom:10px;">Sólo se pueden introducir números y letras.</span>').insertAfter($("#contenedor-direccion"));
					return false;
				}
			});
		$("#numero-1,#numero-2,#numero-3")
			.off("blur change")
			.on("blur change", function (e) {
				var alphaNumericAndSpaces = /^[a-zA-Z0-9 ]*$/;
				if (this.value.match(alphaNumericAndSpaces)) {
					validateAddress();
				} else {
					return false;
				}
			});
	}

	addAutocomplete();

} //addressAutocomplete


$(window).on('hashchange, orderFormUpdated.vtex', function (evt, orderForm) {
	addressAutocomplete();
});

$('body').changes(function (changes, observer) {
	if ($('.ship-street').length > 0 && $('.ship-street').find('#contenedor-direccion').length < 1) {
		addressAutocomplete()
	}
});


$(document).ready(function () {
	$(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
		calculatePromotions(orderForm);
	});

});

const calculatePromotions = (orderForm) => {
	let e = "",
		n = "",
		discount = 0,
		discounts = "";
	const currencySymbol = orderForm.storePreferencesData.currencySymbol,
		rateAndBenefitsIdentifiers = orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers,
		items = orderForm.items;
	for (let t = 0; t < rateAndBenefitsIdentifiers.length; t++) {
		if (rateAndBenefitsIdentifiers[t].name.toLowerCase().indexOf('iva') !== -1) {
			discount = 0;
			for (let e = 0; e < items.length; e++)
				for (let n = 0; n < items[e].priceTags.length; n++)
					items[e].priceTags[n].identifier == rateAndBenefitsIdentifiers[t].id && (discount += items[e].priceTags[n].value);
			e = discount.toString().substr(0, discount.toString().length - 2);
			discounts = orderForm.totalizers.find(t => t.name.toLowerCase().indexOf("descuentos") !== -1).value - discount;
			const discountsFormated = discounts.toString().substr(0, discounts.toString().length - 2);
			discounts = new Intl.NumberFormat("es-CO").format(discountsFormated);
			discount = new Intl.NumberFormat("es-CO").format(e);
			n += `
			  <tr class="promotion-row">
				  <td class="info">${rateAndBenefitsIdentifiers[t].name}</td>
				  <td class="space"></td>
				  <td class="monetary">${currencySymbol} ${discount}</td>
				  <td class="empty"></td>
			  </tr>`
		}
	}
	setTimeout(function () {
		$('.promotion-row').remove();
		$(".totalizers-list .Discounts").after(n);
		if (discounts !== "" && discounts !== 0) {
			if (discounts !== "0")
				$(".totalizers-list .Discounts .monetary").text(`$ ${discounts}`);
			else
				$(".totalizers-list .Discounts").hide();
		}
	}, 1e3);
};

$(function () {

	const customCheckoutInit = function () {
		checkoutStepsReader(location.hash);
		termsCheckbox();
		validateTermsChecked();

		$(window).on('hashchange', function () {
			checkoutStepsReader(location.hash);
		});

	};

	const checkoutStepsReader = function (theHash) {

		const $theSteps = $('.checkout-steps');
		const stepClass = '.checkout-step';
		const allSteps = 'step2 step3 step4 active done';
		const $theStep = $theSteps.find(stepClass);

		$theSteps.find(stepClass);
		$theSteps.removeClass(allSteps);
		$theStep.removeClass(allSteps);

		if (theHash.indexOf('cart') > 0) {
			$theStep.filter('.cart').addClass('active');
		}
		if (theHash.indexOf('email') > 0 || theHash.indexOf('profile') > 0) {
			$theSteps.addClass('step2');
			$theStep.filter('.cart').addClass('done');
			$theStep.filter('.info').addClass('active');
		}
		if (theHash.indexOf('shipping') > 0) {
			$theSteps.addClass('step3');
			$theStep.filter('.cart').addClass('done');
			$theStep.filter('.info').addClass('done');
			$theStep.filter('.shipping').addClass('active');

		}
		if (theHash.indexOf('payment') > 0) {
			$theSteps.addClass('step4');
			$theStep.filter('.cart').addClass('done');
			$theStep.filter('.info').addClass('done');
			$theStep.filter('.shipping').addClass('done');
			$theStep.filter('.payment').addClass('done');
			$theStep.filter('.payment').addClass('active');
		}
	};

	const termsCheckbox = function () {
		var $acceptTermsBox = $('<p>').addClass('accept-terms');
		var $optInTermsCheckBox = $('<input>').attr('type', 'checkbox').attr('id', 'opt-in-terms');
		var $theCheckBox = '<label class="checkbox accept-terms-label for-terms">'
			+ '<input type="checkbox" id="opt-in-terms">'
			+ '<span class="accept-terms-text">Acepto <a href="/info/terminos-y-condiciones" target="_blank" style="text-decoration:underline;">términos y condiciones</a> y la <a href="/info/terminos-y-condiciones" target="_blank" style="text-decoration:underline;">Política de tratamiento de datos personales</a> </span>'
			+ '<span class="error" style="display:none;">Debes aceptar los términos y condiciones para continuar</span>'
			+ '</label>';

		$($theCheckBox).appendTo($acceptTermsBox);
		$('.payment-submit-wrap').after($acceptTermsBox);

		validateTermsChecked()

		$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
			validateTermsChecked()
		});

		///validate the checkbox
		$('.payment-submit-wrap .submit.btn-success').click(function (e) {
			validateTermsChecked()
		});

		$('#opt-in-terms,#opt-in-policies').click(function (e) {
			validateTermsChecked()
		});

	};

	const validateTermsChecked = function () {
		var termsChecked = $('#opt-in-terms:checked').length < 1;
		if (termsChecked) {
			console.log('needs to accept-terms & policies');
			$('.payment-submit-wrap').find('.submit.btn-success').attr('disabled', 'disabled');

			setTimeout(function () {
				$('.payment-submit-wrap').find('.submit.btn-success').attr('disabled', 'disabled')
			}, 2000)

			if (termsChecked) {
				$('.for-terms').find('.error').fadeIn();
			} else {
				$('.for-terms').find('.error').fadeOut();
			}

			return false;
		} else {
			console.log('terms checked, purchase can continue');
			$('.accept-terms').find('.error').fadeOut();
			$('.payment-submit-wrap').find('.submit.btn-success').removeAttr('disabled');

			setTimeout(function () {
				$('.payment-submit-wrap').find('.submit.btn-success').removeAttr('disabled');
			}, 2200)
		}
	};


	customCheckoutInit();

});

$(".product-item-attachment-offerings-select option:contains('prices')").remove();
$(window).on("orderFormUpdated.vtex", function() {
	var pathname = window.location.pathname;
	var hash = window.location.hash;
	if(pathname.includes("/checkout") && hash !== null && hash.split()[0].includes("payment")) {
		"#/payment" == location.hash && setTimeout(function() {
			/*if (vtexjs.checkout.orderForm.paymentData.payments[0].paymentSystem == 521040) {
					$('#debit-option-item5').prepend("<option value='0' >Selecciona un Banco</option>");          
			  }*/
			//Remove baloto
			$('.bank-invoice-item-baloto').remove()
			if(vtexjs.checkout.orderForm.paymentData.payments[0].paymentSystem == 201) {
				var y = document.querySelector(".custom201PaymentGroupPaymentGroup");
				var o = document.querySelector(".payment-confirmation-wrap");
				document.getElementById("contenedor") || (console.log("stop", y), y.insertAdjacentHTML("beforeend", '<div id="contenedor" style="margin-top: 15px"><p>Recuerda que antes de hacer uso de tu crédito necesitamos que valides tu identidad</p><a id="btnWebSvc" class="button" target="_blank" style="display: block; width: 175px;background: #3e3e3f;line-height: 20px;padding: 10px;text-align: center;color: white;font-weight: bold;margin-top: 15px;text-decoration: none;">Validar mi identidad</a></div>'));
				document.getElementById("mensaje_validacion") || (console.log("stop", o), o.insertAdjacentHTML("afterend", '<p id="mensaje_validacion">Para continuar tu pago debes validar tu identidad, ya falta poco &#128521;.</p>'));
				var shopVal = parseFloat(vtexjs.checkout.orderForm.value) / 100;
				var hLink = "https://servicios.almacenesstop.com:9097/PaginaInicial.aspx?marca=S01&monto=" + shopVal + "&proceso=pago";
				/*var hLink="https://servicios.almacenesstop.com:9091/paginainicialMotor.aspx?marca=Y01&monto=" + shopVal +"&proceso=pago";*/
				/*Anexo 23-12-2021 Motor*/
				/*var hLink="http://64.76.176.204:8092/paginainicial.aspx?marca=Y01&monto="+shopVal+"&proceso=pago"; Anexo 23-12-2021 Motor*/
				/*23-12-2021 D.U var hLink="http://servicios.almacenesstop.com/paginainicial.aspx?marca=Y01&monto=" + shopVal +"&proceso=pago";*/
				$("#btnWebSvc").attr("href", hLink);
				$(".icon-lock").parent().attr("disabled", "disabled");
			} else {
				$(".icon-lock").parent().attr("disabled", false);
				$("#mensaje_validacion").remove();
			}
		}, 1200);
	}
	$("#btnWebSvc").click(function() {
		setTimeout(function() {
			$(".icon-lock").parent().attr("disabled", false);
			$("#mensaje_validacion").remove();
		}, 1000);
	});
});
$(document).ready(function() {
	setTimeout(function() {
		"#/cart" == location.hash && (console.log("mensaje_cargado", document.querySelector(".cart-active div#cartLoadedDiv")), document.querySelector(".cart-active div#cartLoadedDiv").insertAdjacentHTML("beforeend", '<div class="mensaje-jbr"> <p class="mensaje-jbr__items">De acuerdo con la Ley Estatutaria 1581 de 2012, la información personal que requerimos del comprador se capta única y exclusivamente para efectos de elaborar la factura de venta, hacerte llegar el(los) producto(s) adquirido(s) e informar sobre las condiciones de envío. Los datos personales requeridos son nombre y apellidos completos, número de cédula, número de contacto celular, correo electrónico y dirección de envío. Si por alguna razón no desea suministrar estos datos no es posible seguir adelante con la compra.</p></div>'));
		var t, e, n;
		document.querySelector(".cart-active .totalizers table.table") && (document.querySelector(".cart-active .totalizers table.table").insertAdjacentHTML("afterend", '<div class="accordion-terminos"> <p>     <input type="checkbox" id="terminosch" value="terminoschx"   required="required"><span><a>Acepto suministrar los datos</a>     </span> </p></div>'), (t = document.getElementById("terminosch")), (e = document.getElementById("cart-to-orderform")), (n = '<span id="acepAlert">Debes aceptar suministrar tus datos</span>'), 1 == t.checked ? ((e.style.opacity = "1"), (e.style.pointerEvents = "inherit"), e.nextElementSibling.remove()) : ((e.style.opacity = "0.4"), (e.style.pointerEvents = "none"), e.insertAdjacentHTML("afterend", n)), t.addEventListener("change", function() {
			event.target.checked ? ((e.style.opacity = "1"), (e.style.pointerEvents = "inherit"), e.nextElementSibling.remove()) : ((e.style.opacity = "0.4"), e.insertAdjacentHTML("afterend", n), (e.style.pointerEvents = "none"));
		}));
	}, 1000);
});
/*-------------------------------------*/
/*-------------------------------------*/
/*------------CONTRAENTREGA------------*/
/*-------------------------------------*/
/*-------------------------------------*/
function hashParam(hash) {
	if(hash === "/checkout#/shipping" || hash === "/checkout#/payment") {
		var findMethodVtexCE = setInterval(() => {
			if(typeof vtexjs !== "undefined") {
				$('label[id="Pago Contraentrega"').css("display", "flex");
				clearInterval(findMethodVtexCE);
				if(vtexjs.checkout.orderForm.shippingData.logisticsInfo[0].selectedSla === "Pago Contraentrega") {
					var hideMethodPayments = setInterval(() => {
						if($(".payment-group-item").length && $("#payment-group-custom203PaymentGroupPaymentGroup").length) {
							console.info('$(".PAYMENT-GROUP-ITEM").LENGTH')
							console.info($(".payment-group-item").length)
							console.info('$("#PAYMENT-GROUP-CUSTOM203PAYMENTGROUPPAYMENTGROUP").LENGTH')
							console.info($("#payment-group-custom203PaymentGroupPaymentGroup").length)
							$(".payment-group-item").hide();
							$("#payment-group-custom203PaymentGroupPaymentGroup").css("display", "block");
							$(".payment-group-list-btn").find("a#payment-group-custom203PaymentGroupPaymentGroup").trigger("click");
							$('label[id="Pago Contraentrega"').css("display", "flex");
							clearInterval(hideMethodPayments);
						}
					}, 500);
					var assignClassActiveCE = setInterval(() => {
						$(".payment-group-list-btn").find("a#payment-group-custom203PaymentGroupPaymentGroup").trigger("click");
						if($(".payment-group-list-btn").find("a#payment-group-custom203PaymentGroupPaymentGroup").hasClass("active")) {
							clearInterval(assignClassActiveCE);
						}
					}, 500);
				} else {
					var assignClassFirstActive = setInterval(() => {
						$(".payment-group-list-btn").find("a#payment-group-custom201PaymentGroupPaymentGroup").trigger("click");
						if($(".payment-group-list-btn").find("a#payment-group-custom201PaymentGroupPaymentGroup").hasClass("active")) {
							clearInterval(assignClassFirstActive);
						}
					}, 500);
				}
			}
		}, 500);
	}
}
hashParam(location.pathname + location.hash);
$(document).ready(function() {
	hashParam(location.pathname + location.hash);
});
$(window).on("hashchange", function() {
	hashParam(location.pathname + location.hash);
});
/*-------------------------------------*/
/*-------------------------------------*/
/*------------CONTRAENTREGA------------*/
/*-------------------------------------*/
/*-------------------------------------*/