export const normalizePhones = (phones) => {
	let data = {
		did: '',
		extension: ''
	};

	for (let i = 0; i < phones.length; i++) {
		if (phones[i]['primary']) {
			if (phones[i]['type'] == 'work_extension') {
				data.extension = phones[i]['value'];
			} else if (phones[i]['type'] == 'work') {
				data.did = phones[i]['value'];
			}
		}
	}

	if (!data.did && !data.extension) {
		return '';
	} else {
		return `${data.did}  x${data.extension}`;
	}
};
