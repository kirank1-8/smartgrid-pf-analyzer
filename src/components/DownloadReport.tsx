export default function DownloadReport() {

  const downloadReport = () => {

    const report = `
SMARTGRID PF ANALYZER REPORT

System Voltage: 230V
System Current: 12A
Frequency: 50Hz
Power Factor Status: GOOD
Grid Health: STABLE

Generated Successfully.
    `;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "SmartGrid_Report.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadReport}
      className="bg-green-500 hover:bg-green-600 transition-all px-6 py-3 rounded-xl font-bold text-black"
    >
      Download System Report
    </button>
  );
}