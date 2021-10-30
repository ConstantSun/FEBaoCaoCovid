class dateRangeController {
    constructor(id) {
        this.id = id
    }
    show(province){
        return `<input type="text" name="daterange" id="${this.id}" class="form-control"/>`;
    }

    setup() {
        $(document).ready(function() {
            let maxDate = moment().format('DD/MM/YYYY')
            let minDate = moment().subtract(1, "months").format('DD/MM/YYYY')
            $('input[name="daterange"]').daterangepicker({
                opens: 'left',
                maxDate: maxDate,
                minDate: minDate,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });
        });
    }
}