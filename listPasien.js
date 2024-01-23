const itemsPerPage = 10; // Number of items per page
const totalEntries = 310; // Total number of entries

const fetchData = async () => {
  try {
    const response = await fetch('./data-dummy-pasien.json');
    const rawData = await response.json();

    const data = [];

    // Limit the queries to fetch only 50 entries
    for (let i = 0; i < Math.min(totalEntries, 50); i++) {
      const index = i % rawData.length;
      data.push(rawData[index]);
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const renderTableRows = (data, currentPage) => {
  const tableBody = $('tbody');
  tableBody.empty();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const patient = data[i];
    const row = $('<tr>');
    row.html(`
      <th scope="row">${i + 1}</th>
      <td>${patient.nama}</td>
      <td>${patient.tanggal_lahir}</td>
      <td>${patient.jenis_kelamin}</td>
      <td>${patient.alamat}</td>
      <td>${patient.no_telp}</td>
    `);
    tableBody.append(row);

    const startRange = Math.min(data.length, startIndex + 1);
    const endRange = Math.min(data.length, endIndex);
    $('#startRange').text(startRange);
    $('#endRange').text(endRange);
    $('#totalEntries').text(totalEntries);
  }
};

const renderPagination = (data, totalPages, currentPage) => {
  const pagination = $('#pagination');
  pagination.empty();

  if (totalPages <= 1) {
    return; // No need for pagination if there's only one page
  }

  // Helper function to add page item
  const addPageItem = (page, label, isDisabled, isActive) => {
    const listItem = $(`<li class="page-item${isActive ? ' active' : ''}${isDisabled ? ' disabled' : ''}"><a class="page-link" href="#">${label || page}</a></li>`);
    listItem.on('click', function () {
      if (!isDisabled) {
        renderTableRows(data, page);
        renderPagination(data, totalPages, page);
      }
    });
    pagination.append(listItem);
  };

  // Show "Previous" button
  addPageItem(currentPage - 1, '&laquo;', currentPage === 1, false);

  // Show the pages around the current page with a maximum of 4 visible pages
  const maxVisiblePages = 4;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    addPageItem(i, null, false, i === currentPage);
  }

  // Show "Next" button
  addPageItem(currentPage + 1, '&raquo;', currentPage === totalPages, false);
};

const init = async () => {
  try {
    const data = await fetchData();
    renderTableRows(data, 1);
    renderPagination(data, Math.ceil(data.length / itemsPerPage), 1);
  } catch (error) {
    console.error(error.message);
  }
};

$(document).ready(() => {
  init();
}); 

