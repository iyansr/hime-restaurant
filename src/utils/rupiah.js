const convertToRupiah = angka => {
	let rupiah = ''
	let angkarev = angka
		.toString()
		.split('')
		.reverse()
		.join('')
	for (let i = 0; i < angkarev.length; i++)
		if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
	return (
		'IDR. ' +
		rupiah
			.split('', rupiah.length - 1)
			.reverse()
			.join('')
	)
}

export default convertToRupiah
