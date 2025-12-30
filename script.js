$(document).ready(function() {
    
    // 下載檔案的輔助函式
    function downloadFile(fileName) {
        const link = document.createElement('a');
        link.href = fileName; 
        link.download = fileName; 
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link); 
    }
    
    const navLinks = $('nav a.nav-link');
    const pages = $('main .page-content');

    // 頁籤切換功能
    function showPage(pageId) {
        pages.removeClass('active');
        navLinks.removeClass('active');
        $(pageId).addClass('active');
        $(`nav a[href="${pageId}"]`).addClass('active');
    }

    navLinks.on('click', function(e) {
        e.preventDefault();
        const pageId = $(this).attr('href');
        showPage(pageId);
    });

    // 預設顯示第一個頁面
    showPage('#page-1');

    // --- Modal 彈出視窗邏輯 ---
    $('#btn-add-new').on('click', function() {
        $('#import-year').val('115');
        $('#file-upload-modal').val('');
        $('#btn-upload').prop('disabled', true);
        $('#modal-overlay').fadeIn();
    });

    $('#file-upload-modal').on('change', function() {
        if ($(this).get(0).files.length > 0) {
            $('#btn-upload').prop('disabled', false);
        } else {
            $('#btn-upload').prop('disabled', true);
        }
    });

    $('#btn-modal-cancel, #btn-modal-close').on('click', function() {
        $('#modal-overlay').fadeOut();
    });

    $('#modal-overlay').on('click', function(e) {
        if ($(e.target).is('#modal-overlay')) {
            $(this).fadeOut();
        }
    });

    $('#btn-upload').on('click', function() {
        const yearInput = $('#import-year');
        const year = yearInput.val();
        if (year === '115') {
            alert('(展示) 開始背景執行 115 年度的資料上傳...');
            $('#modal-overlay').fadeOut();
        } else if (year === '') {
            alert('錯誤：請輸入年份。');
        } else {
            alert('錯誤：年度 ' + year + ' 已存在。 (此為展示邏輯，僅允許 115)');
        }
    });

    // --- 其他展示用彈出提示 ---
    $('#btn-trigger-analysis').on('click', function() {
        alert('(展示) 已觸發「相似度文字比對」。\n\n(依先前需求) 系統將自動尋找年度最大的資料 (例如：115年)，並與所有歷史資料進行比對。');
    });
    
    // 表格中的 "匯出" 按鈕邏輯
    $('.btn-export-excel').on('click', function() {
        const year = $(this).closest('tr').find('td:first').text();
        alert(`(展示) 正在「匯出」 ${year} 的 Excel 資料...`);
        // 觸發下載
        downloadFile('01_主計創新變革項目(106-113計907筆)(114計175筆)_合計1082筆.xlsx');
    });

    // 表格中的 "匯入 (匯回)" 按鈕邏輯
    $(document).on('click', '.btn-re-import', function() {
         const year = $(this).closest('tr').find('td:first').text();
         alert(`(展示) 觸發 ${year} 年度的「匯入(匯回)」功能。\n\n(此處應觸發一個檔案選擇視窗，讓使用者上傳修改後的 Excel 檔案)`);
    });

    // "錯誤報告" 按鈕的 class
    $(document).on('click', '.btn-report-error', function() {
        alert('(展示) 顯示「錯誤報告」：檔案 "example.pdf" 因無法解析文字而失敗。');
    });

    // "刪除" 按鈕邏輯
    $(document).on('click', '.btn-delete', function() {
        const year = $(this).closest('tr').find('td:first').text();
        if (confirm(`(展示) 您確定要刪除 ${year} 年度的所有資料嗎？\n\n此操作無法復原。`)) {
            alert(`${year} 年度資料已刪除。`);
            // 可以在此處加入 $(this).closest('tr').remove(); 來實際移除該行
        }
    });

    // [修改] "關鍵字查詢" 邏輯 (改為 alert 彈窗)
    $('#btn-keyword-search').on('click', function() {
        const keyword = $('#keyword-search-input').val();
        
        if (keyword === '') {
            alert('請輸入關鍵字。'); // 如果空白，提示使用者
            return;
        }
        
        // 模擬您提供的三筆查詢結果 (使用 \n 換行)
        const resultText = 
            `(展示) 於「115年度」資料中，找到關鍵字 "${keyword}" 共 10 筆。\n` +
            `(展示) 於「114年度」資料中，找到關鍵字 "${keyword}" 共 1 筆。\n` +
            `(展示) 於「112年度」資料中，找到關鍵字 "${keyword}" 共 7 筆。`;
        
        alert(resultText); // 使用 alert()
    });

    
    // 頁面二 (功能一)
    $('#btn-export-all-analysis').on('click', function() {
        alert('(展示) 正在匯出所有比對結果 (Excel)...');
        downloadFile('相似度分析比對報告.xlsx');
    });

    // 頁面二 (功能二)
    $('#btn-generate-report').on('click', function() {
        const threshold = $('#threshold').val();
        const path = $('#base-path').val() || "[未輸入路徑]";
        
        if ($('#template-upload').get(0).files.length === 0) {
             alert('錯誤：請先「上傳總表樣板」。');
             return;
        }
        
        alert(`(展示) 開始製作報告...\n\n比對值門檻：${threshold}\n儲存基底路徑：${path}\n\n系統將依規則回填 Top 3 超連結並產出 Excel。`);
        downloadFile('總表.xlsx');
    });

});