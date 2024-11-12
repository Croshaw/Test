import axios from "axios";
const input = document.getElementById("exp");
const button = document.getElementById("executor");
const result = document.getElementById("result");

button.addEventListener("click", async function () {
	try {
		const response = await axios.get(
			`http://127.0.0.1:3000/?exp=${input.value.replace(/\+/g, "%2B")}`
		);
		result.textContent = response.data.result;
	} catch (error) {
		console.error("Error fetching data:", error);
		result.textContent = "Ошибка при получении данных";
	}
});
