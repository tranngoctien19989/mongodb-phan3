const express = require('express')
const expressHbs = require('express-handlebars');
const port = 3000
// const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




const app = express();
app.engine('.handlebars', expressHbs.engine());
app.set('view engine', '.handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://tientnph19989:tien03@cluster0.jicczym.mongodb.net/CP17302?retryWrites=true&w=majority')
  .then(() => console.log('Kết nối thành công')) // then catch dùng để xử lý kết quả kết nối có thành công hay không
  .catch((err) => console.log(err));

const SinhVienModel = require('./SinhVienModel');

app.get('/', async (req, res) => {
  try {
    let users = await SinhVienModel.find({}); // truy vấn bản ghi trong cơ sở dữ liệu
    users = users.map((user) => user.toObject());// Sau đó, nó chuyển đổi kết quả truy vấn thành đối tượng JavaScript thông qua toObject() .
    res.render('list', { users }); //và trả về trang web dưới dạng HTML sử dụng res.render()
  } catch (err) {
    console.log(err);
    res.status(500).send('Lỗi');
  }
});

app.get('/add', (req, res) => {
  res.render('add'); // trả về một trang html
});

app.post('/them', async (req, res) => { // thêm một đối tượng vào CSDL
  await SinhVienModel.create(req.body); // thêm đối tượng mới vào CSDL
  let users = await SinhVienModel.find({}); // khi thêm nó sẽ lưu vào users
  res.render('list', { users });// rồi nó cập nhật đến trang html list với dữ liệu là user
  res.redirect('/'); // chuyển hướng đến trang chủ
});


app.get('/update', async (req, res) => {
  // const user = await SinhVienModel.findByIdAndUpdate(req.params.id);
  res.render('update');
});

app.post('/update', async (req, res) => {
  res.redirect('/');
});

app.get('/delete', (req, res) => {
  res.render('delete');
});

//'/delete/:id' là một đường dẫn có tham số :id được truyền vào địa chỉ URL
// để xác định đối tượng SinhVien sẽ bị xóa khỏi cơ sở dữ liệu.
app.get('/delete/:id', async (req, res) => {
  await SinhVienModel.findByIdAndDelete(req.params.id);
  res.redirect('/');
});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});