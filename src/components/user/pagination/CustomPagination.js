import PageItems from "./PageItems";
import React from "react";

export default function CustomPagination({currentPage, pageCount, changeCurrentPage}) {
    return (
        <>
            <div className=""
                 style={{
                     marginTop: "20px",
                     marginBottom: "20px"

                 }}>
                <div className="row justify-content-md-center">
                    <ul className="pagination col-auto">
                        <li
                            className={"page-item " + (currentPage === 1 ? "disabled" : "")}
                            onClick={() => {
                                changeCurrentPage(-1)
                            }}
                            style={{
                                cursor: "pointer"
                            }}
                        >
                            <span className="page-link">Geri</span>
                        </li>

                        <PageItems
                            pageCount={pageCount}
                            currentPage={currentPage}
                            changeCurrentPage={changeCurrentPage}
                        />

                        <li
                            className={"page-item " + (pageCount === currentPage ? "disabled" : "")}
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                changeCurrentPage(1)
                            }}
                        >
                            <span className="page-link"
                                  style={{

                                  }}
                            >İleri</span>
                        </li>
                    </ul>
                </div>

            </div>

        </>
    )
}