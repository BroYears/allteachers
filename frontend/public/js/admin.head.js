const deleteItem = () => {
  if (confirm('정말 삭제하시겠습니까?')) {
      if (document.xhr) return;
      
      document.xhr = $.ajax({
          url: `/lib/board_delete.proc.php`,
          data: {'idx': $('input[name=idx]').val(), 't': $('input[name=t]').val()},
          type:'post',
          dataType: "json",
          success:function(r){
              if (r.status == 'OK') {
                  alert('삭제되었습니다.'); 
                  opener.parent.location.reload(); 
                  window.close();
              } else {
                  alert(r.msg);
              }
          }, error:function(request, status, error){
              console.log(request, status, error);
          }, complete:function(){
              document.xhr = false;
          }
      });
  }
}

const deleteFile = () => {
  if (confirm("정말 삭제하시겠습니까?\n삭제 후 복구할 수 없습니다.")) {
      if (document.xhr) return;
      
      document.xhr = $.ajax({
          url: `/lib/delete_file.php`,
          data: {'idx': $('input[name=idx]').val(), 't': $('input[name=t]').val()},
          type:'post',
          dataType: "json",
          success:function(r){
              if (r.status == 'OK') {
                  alert('삭제되었습니다.'); 
                  $('#file_dom').html(`<input name="file" type="file">`);
              } else {
                  alert(r.msg);
              }
          }, error:function(request, status, error){
              console.log(request, status, error);
          }, complete:function(){
              document.xhr = false;
          }
      });
  }
}

// element 삭제
const deleteElement = (el, depth=0) => {
    const node = $(el).parents()[depth];
    node.remove();
}

// 파일 추가
const add_file = (el) => {
    $(el).before(`
        <div class="mb5">
            <input type="file" name="file[]">
            <button type="button" class="btn del_btn" onclick="deleteElement(this)">삭제</button>
        </div>
    `);
}