const Transport = new HTTPTransport("http://localhost:5000");

$("form", {
	onsubmit:async function(event){
		event.preventDefault();
		const response = await Transport.packupData(this).post("/api/translate");
		const translated_sentence = $("#translated-sentence")[0];
		const error_msg = $("#error-msg")[0];
		if(response.error){
			translated_sentence.innerHTML = "";
			error_msg.textContent = JSON.stringify(response);
		}else{
			translated_sentence.innerHTML = response.translation;
			error_msg.textContent = "";
		}
	}
})
