export const createdDownloadUrl = (response: any) => {
	const url = URL.createObjectURL(new Blob([response]));
	const link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", "report.pdf");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}