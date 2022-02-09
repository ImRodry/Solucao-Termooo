import App from "../../App"

export default function Termooo() {
	const favicon = document.getElementById("favicon")! as HTMLLinkElement
	favicon.href = "/termooo.ico"
	document.title = "Solução do Termooo"
	return App("termooo")
}
