import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cellEditFactory from "react-bootstrap-table2-editor";

import axios from "axios";
function Releases() {
  const [isLoading, setIsLoading] = useState(true);
  const [releases, setReleases] = useState([]);
  const navigate = useNavigate();

  const rescrapReleases = async () => {
    try {
      if (window.confirm("This operation might take approximately 1 minute") === true) {
        setIsLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/releases`);
        await fetchAllRelease();
        toast.success(data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteRelease = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKENDURL}/api/deleterelease/` + id
      );
      await fetchAllRelease();
      toast.success(data);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchAllRelease = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKENDURL}/api/getallreleases`, {})
      .then(function (response) {
        setReleases(response.data);
        setIsLoading(false);
      });
  };

  const updateRelease = async (id, releaseData) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKENDURL}/api/updaterelease/` + id,
        { releaseData }
      );
      fetchAllRelease();
      toast.success(data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchAllRelease();
  }, []);
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
          Release Link
        </a>
      </span>
    );
  }
  const columns = [
    {
      dataField: "release_id",
      text: "ID",
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "release_name",
      text: "release name",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "release_link",
      text: "Release Link",
      headerAlign: "center",
      align: "center",
      editable: false,
      formatter: linkFormatter,
    },
    {
      dataField: "release_date",
      text: "release date",
      headerAlign: "center",
      align: "center",
      editable: false,
    },
    {
      dataField: "variant_available",
      text: "#variant available",
      headerAlign: "center",
      align: "center",
    },
    {
      dataField: "df2",
      isDummyField: true,
      editable: false,
      text: "Actions",
      headerAlign: "center",
      align: "center",
      formatter: (cellContent, row) => {
        return (
          <>
            <button
              className="btn btn-success mx-2"
              onClick={() => navigate(`/variant/${row.release_id}`)}
              style={{ fontSize: "12px" }}
            >
              See All Variants
            </button>
            <button
              className="btn btn-danger mx-2"
              onClick={() => deleteRelease(row.release_id)}
              style={{ fontSize: "12px" }}
            >
              Delete{" "}
            </button>
          </>
        );
      },
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
    <>
      <div className="m-2 d-flex justify-content-center">
        <button
          className="btn btn-outline-secondary"
          onClick={() => rescrapReleases()}
        >
          {releases.length === 0 ? "Get Instagram Releases" : "Refresh Instagram Releases "}
        </button>
      </div>
      <BootstrapTable
        keyField="release_id"
        data={releases}
        columns={columns}
        stripe
        hover
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          afterSaveCell: (oldValue, newValue, row, column) => {
            if (newValue !== oldValue) {
              updateRelease(row.release_id, row);
            }
          },
        })}
      />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Releases;
