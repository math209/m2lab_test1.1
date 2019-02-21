const app = new Vue ({
    el: '#app',
    data: {
        str_buy:[],
        str_sell:[],
        resp:{
            buy:{wmr: '', wmz: ''},
            sell:{wmr: '',wmz: ''}
        },
        cps:[
            {text: 'WMR', val: 1},
            {text: 'WMZ', val: 2}
        ]
    },
    methods: {
        change_buy: function(){  
            const sel = this.$refs.select_buy[this.$refs.select_buy.selectedIndex].text.toLowerCase();           
            let cnt = 0;
            if ( this.$refs.input_buy.value != ''
                && this.$refs.input_buy.value != 0
                && this.$refs.select_buy.selectedIndex > 0) {
              cnt = this.resp.buy[sel] * this.$refs.input_buy.value;
            }
            this.$refs.label_buy_cnt.innerHTML = cnt;

            this.str_buy = {'inp':this.$refs.input_buy.value, 'sel': this.$refs.select_buy.selectedIndex,'lbl': cnt};    
            const parsed = JSON.stringify(this.str_buy);
            localStorage.setItem('str_buy', parsed);
        },
        change_sell: function(){
            const sel = this.$refs.select_sell[this.$refs.select_sell.selectedIndex].text.toLowerCase();
            let cnt = 0;
            if ( this.$refs.input_sell.value != ''
                && this.$refs.input_sell.value != 0
                && this.$refs.select_sell.selectedIndex > 0) {
              cnt = this.$refs.input_sell.value / this.resp.sell[sel] ;
            }
            this.$refs.label_sell_cnt.innerHTML = cnt;
            
            this.str_sell = {'inp':this.$refs.input_sell.value, 'sel': this.$refs.select_sell.selectedIndex,'lbl': cnt};    
            const parsed = JSON.stringify(this.str_sell);
            localStorage.setItem('str_sell', parsed);
        },
        isNumberKey: function(evt){
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
                evt.preventDefault();
                return false;
            }
        }
    },
    mounted() { 
        console.log(`mounted:${localStorage.getItem('str_buy')}|${localStorage.getItem('str_sell')}`)
        if (localStorage.getItem('str_buy')) {
            try {
                this.str_buy = JSON.parse(localStorage.getItem('str_buy'));
            } catch(e) {
                localStorage.removeItem('str_buy');
            }
        }
        if (localStorage.getItem('str_sell')) {
            try {
                this.str_sell = JSON.parse(localStorage.getItem('str_sell'));
            } catch(e) {
                localStorage.removeItem('str_sell');
            }
        }
    },
    created() {
        setTimeout(()=>{
          data = {
            sell:{
              wmr: 0.96,
              wmz: 55.7,
            },
            buy:{
              wmr:1,
              wmz:58.9,
            }
          }
        //console.log(data);
          this.resp = data;
        },1000)
    }
})