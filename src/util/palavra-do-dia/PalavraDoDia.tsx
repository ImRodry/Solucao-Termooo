import App from "../../App"

export default function PalavraDoDia() {
	const favicon = document.getElementById("favicon")! as HTMLLinkElement
	favicon.href = "/palavra-do-dia.ico"
	document.title = "Solução da Palavra do Dia"
	return App("palavra-do-dia")
}
