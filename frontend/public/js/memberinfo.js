const idCheck = () => {
  if (document.xhr) return;

  document.xhr = $.ajax({
    url: '/lib/join.proc.php',
    data: {'ACT':'I', 'uid':$('input[name=uid]').val()},
    type:'post',
    dataType: "json",
    success:function(r){
      if (r.status == 'OK') {
        alert('사용 가능한 ID입니다.');
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

const regist = () => {
  if (document.xhr) return;
  
  let frmdata = new FormData($('#frm')[0]);
  frmdata.append('ACT', 'C');

  document.xhr = $.ajax({
    url: '/lib/join.proc.php',
    data: frmdata,
    type:'post',
    dataType: "json",
    contentType: false,
    processData: false,
    success:function(r){
      if (r.status == 'OK') {
        alert('회원이 추가되었습니다.');
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

const regist_user = () => {
  if (document.xhr) return;
  
  let frmdata = new FormData($('#frm')[0]);
  frmdata.append('ACT', 'C');

  document.xhr = $.ajax({
    url: '/lib/join.proc.php',
    data: frmdata,
    type:'post',
    dataType: "json",
    contentType: false,
    processData: false,
    success:function(r){
      if (r.status == 'OK') {
        alert('회원가입이 완료되었습니다.');
        location.href="/login.html";
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

const correction = () => {
  if (document.xhr) return;
  
  let frmdata = new FormData($('#frm')[0]);
  frmdata.append('ACT', 'U');

  document.xhr = $.ajax({
    url: '/lib/join.proc.php',
    data: frmdata,
    type:'post',
    dataType: "json",
    contentType: false,
    processData: false,
    success:function(r){
      if (r.status == 'OK') {
        alert('회원정보가 수정되었습니다.');
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

const sendMailCode = () => {
  if (document.xhr) return;

  document.xhr = $.ajax({
    url: '/lib/join.proc.php',
    data: {'ACT':'E', 'email':$('input[name=email]').val()},
    type:'post',
    dataType: "json",
    success:function(r){
      if (r.status == 'OK') {
        alert('메일을 통해 인증코드가 발송되었습니다.');
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

const checkMailCode = () => {
  if (document.xhr) return;

  document.xhr = $.ajax({
    url: '/lib/join.proc.php',
    data: {'ACT':'EC', 'email':$('input[name=email]').val(), 'code':$('input[name=email_code]').val()},
    type:'post',
    dataType: "json",
    success:function(r){
      if (r.status == 'OK') {
        alert('인증이 완료되었습니다.');
        $('input[name=email]').attr('readonly', true);
        $('input[name=email]').css('background-color', '#ddd');
        $('input[name=email_code]').attr('readonly', true);
        $('input[name=email_code]').css('background-color', '#ddd');
        $('#btn_sendMail').hide();
        $('#btn_checkCode').hide();
        $('#btn_check').show();
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