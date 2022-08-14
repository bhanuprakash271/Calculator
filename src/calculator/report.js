import React, { useEffect } from "react";
import jsPDF from "jspdf";
import Button from "@mui/material/Button";
import autoTable from "jspdf-autotable";
import DownloadIcon from "@mui/icons-material/Download";
import PDFName from "./pdfName";

export default function Report(props) {
  const [amountList, setAmountList] = React.useState([]);
  const [itemList, setItemList] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  // to get the date
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  useEffect(() => {
    let dummyAmountList = [];
    let dummyItemList = [];
    // to arrange the total amount list
    Object.keys(props.totalData).forEach((item) => {
      let dummyArray = [];
      dummyArray.push(item);
      dummyArray.push(Math.round(props.totalData[item] * 100) / 100);
      dummyAmountList.push(dummyArray);
    });
    setAmountList(dummyAmountList);

    // to arrange the all items list
    props.itemData.forEach((data) => {
      let dummyArray = [];
      Object.keys(data).forEach((value) => {
        dummyArray.push(data[value]);
      });
      dummyItemList.push(dummyArray);
      setItemList(dummyItemList);
    });
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // to handle the report download
  const Report = (pdfText) => {
    handleDialogClose();
    const doc = new jsPDF("l", "mm", [297, 210]);

    doc.setFontSize(18);
    doc.text(pdfText, 14, 20);
    doc.setTextColor(100);

    doc.setFontSize(18);
    doc.text("Individual Expenses Summary ", 14, 30);
    doc.setTextColor(100);

    autoTable(doc, {
      head: [["Name", "Amount ($)"]],
      body: amountList,
      startY: 35,
      showHead: "firstPage",
    });

    // to get where the last table ended
    let alignOne = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(18);
    doc.text("Details of Items Purchased ", 14, alignOne);
    doc.setTextColor(100);

    autoTable(doc, {
      head: [["Product", "Price ($)", "Purchased By"]],
      body: itemList,
      startY: alignOne + 5,
    });

    let alignTwo = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(10);
    doc.text(`This PDF is generated on ` + today, 200, alignTwo);
    doc.setTextColor(100);

    doc.save("Expenses_" + today + "_.pdf");
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{ backgroundColor: "green", color: "white" }}
        onClick={() => {
          handleDialogOpen();
        }}
        endIcon={<DownloadIcon />}
      >
        Report
      </Button>
      <PDFName
        open={openDialog}
        handleDialogClose={handleDialogClose}
        handleReport={Report}
      />
    </div>
  );
}
