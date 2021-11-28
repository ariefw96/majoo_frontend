// Method to format amount
export const formatAmount = value => {
    if (value) {
        let text = '';
        let val = Number(value);
        if (val % 1 !== 0) {
            let mod = Math.abs((val % 1) * 100);
            text = ',' + Math.round(mod);
        }
        val = val > 0 ? Math.floor(val) : Math.ceil(val);
        let count = 0;
        try {
            while (Math.abs(val / 10) >= 1) {
                let mod = Math.abs(val % 10);
                if (count % 3 === 0 && count > 0) {
                    text = mod + '.' + text;
                } else {
                    text = mod + text;
                }
                val = val > 0 ? Math.floor(val / 10) : Math.ceil(val / 10);
                count++;
            }
        } catch (error) {
            console.log('Error Calculating Value', error);
        }
        if (count % 3 === 0 && count > 0) {
            text = val + '.' + text;
        } else {
            text = val + text;
        }
        return 'Rp ' + text;
    } else {
        return 'Rp ' + 0;
    }
};

export default { formatAmount };