import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Triangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
function Variants() {
  const [isLoading, setIsLoading] = useState(true);
  const [variants, setVariants] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/getreleasevariants/` + id, {})
      .then(function (response) {
        setVariants(response.data);
        setIsLoading(false);
      });
  }, [id]);
  function linkFormatter(cell, row) {
    return (
      <span>
        <a
          style={{ color: "red", textDecoration: "underline" }}
          href={cell}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          download Link
        </a>
      </span>
    );
  }
  const columns = [
    {
      dataField: "variant_id",
      text: "ID",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "variant_name",
      text: "Variant name",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "download_link",
      text: "Download Link",
      headerAlign: "center",
      align: "center",
      formatter: linkFormatter,
    },
    {
      dataField: "variant_date",
      text: "variant date",
      headerAlign: "center",
      align: "center",
      editable: false,
    },
    {
      dataField: "minimum_version",
      text: "Minimum Version",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "architecture",
      text: "architecture",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "screen_dPI",
      text: "Screen dPI",
      headerAlign: "center",
      align: "center",
    },
  ];
  return isLoading ? (
    <Triangle
      height="180"
      width="180"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
      wrapperClassName=""
      visible={true}
    />
  ) : (
    <BootstrapTable
      keyField="variant_id"
      data={variants}
      columns={columns}
    />
  );
}

export default Variants;
