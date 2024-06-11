let rateData;

const $rate = $("#rates");
const $fireworks = $("#fireworks");
const $mainContent = $("main");

function handleGetRate(event) {
    event.preventDefault();
    const $crypto = $("#crypto");
    
    $.ajax({
        url: `https://api.coinbase.com/v2/exchange-rates?currency=${$crypto.val()}`
    }).then(
        function(data) {
            rateData = data;
            render();
        }, 
        function(error) {
            console.log("oops something didn't work", error);
        }
    );
}

function render() {
    const $curr = $("#curr").val().toUpperCase();
    if (rateData && rateData.data && rateData.data.rates) {
        const rate = rateData.data.rates[$curr];
        console.log($curr);
        console.log(rateData.data.rates.USD);
        console.log(rateData.data.rates);
        console.log(rate);
        $rate.text(rate ? `Rate: ${rate}` : `Rate not found for currency: ${$curr}`);
    } else {
        console.log("Rate data is not available.");
    }
}

$('form').on('submit', handleGetRate);