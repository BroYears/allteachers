// element 삭제
const deleteElement = (el, depth=0) => {
  const node = $(el).parents()[depth];
  node.remove();
}

// 파일 추가
const add_file = (el) => {
  $(el).before(`
      <div class="user_file_wrap">
          <label for="user_wr_file" class="user_file_btn">파일선택</label>
          <input id="user_wr_file" class="user_wr_file" type="file" name="file[]" value="">
          <input type="text" class="user_file_name" placeholder="파일을 선택해주세요" value="" readonly>
          <button type="button" class="user_file_btn del_btn" onclick="deleteElement(this)">삭제</button>
      </div>
  `);
}

/*notice - write 파일첨부시 파일 네임 변경*/
$("#user_wr_file1").on('change',function(){
    var fileName = $("#user_wr_file1").val();
    $(".user_file_name._1").val(fileName);
});

$("#user_wr_file2").on('change',function(){
    var fileName = $("#user_wr_file2").val();
    $(".user_file_name._2").val(fileName);
});

$("#user_wr_file3").on('change',function(){
    var fileName = $("#user_wr_file3").val();
    $(".user_file_name._3").val(fileName);
});

$("#user_wr_file4").on('change',function(){
    var fileName = $("#user_wr_file4").val();
    $(".user_file_name._4").val(fileName);
});

$("#user_wr_file5").on('change',function(){
    var fileName = $("#user_wr_file5").val();
    $(".user_file_name._5").val(fileName);
});