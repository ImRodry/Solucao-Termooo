import App from "../../App"

export default function Termooo() {
	const favicon = document.getElementById("favicon")! as HTMLLinkElement
	favicon.href = "/termopt.ico"
	document.title = "Solução do Termo"
	return App("termopt")
}
