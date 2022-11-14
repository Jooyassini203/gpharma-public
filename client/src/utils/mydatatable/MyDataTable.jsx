import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

export default function MyDataTable({
  data,
  columns,
  actions,
  title,
  filterClass,
}) {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  let filteredItems = null;
  if (data) {
    filteredItems = data.filter(
      (item) =>
        JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
        -1
    );
  }

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <input
        type="text"
        className={filterClass ? filterClass : "w-25 form-control"}
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Filtre ... "
      />
    );
  }, [filterText, resetPaginationToggle]);

  // -------------------------
  return (
    <DataTable
      title={title}
      columns={columns}
      data={filteredItems}
      defaultSortField="name" 
      customStyles={{ 
        table: {
          style: { 
            zIndex: 0,
          },
        }, 
        rows: {
          style: {
            zIndex: 0, 
          },
        }, 
      }}
      striped
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
      fixedHeader
      fixedHeaderScrollHeight="800vh"
      highlightOnHover
      actions={actions}
    />
  );
}
