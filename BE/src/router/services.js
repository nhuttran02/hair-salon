// //Dinh nghia cac API
// import express from 'express';
// const router = express.Router();

// //Mock database cho vi du
// let services = [];

// /**
//  * @swagger
//  * /services:
//  *   get:
//  *     summary: Lấy danh sách dịch vụ
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// router.get('/services', (req, res) => {
//     res.json(services);
// });

// /**
//  * @swagger
//  * /services:
//  *   post:
//  *     summary: Them dich vu moi
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *     responses:
//  *       201:
//  *         description: Dich vu da duoc tao
//  */
// router.post('/services', (req, res) => {
//     const newService = {
//         id: services.length + 1,
//         name: req.body.name,
//         price: req.body.price,
//     };
//     services.push(newService);
//     res.status(201).json(newService);
// });

// // /**
// //  * @swagger
// //  * /services/{id}:
// //  *   put:
// //  *     summary: Cap nhat thong tin dich vu
// //  *     parameters:
// //  *       - in: path
// //  *         name: id
// //  *         schema:
// //  *           type: integer
// //  *         required: true
// //  *         description: ID cua dich vu
// //  *     requestBody:
// //  *       required: true
// //  *       content:
// //  *         application/json:
// //  *           type: object
// //  *           properties:
// //  *             name:
// //  *               type: string
// //  *             price:
// //  *               type: number
// //  *   responses:
// //  *     200:
// //  *       description: Dich vu da duoc cap nhat
// //  */
// /**
//  * @swagger
//  * /services/{id}:
//  *   put:
//  *     summary: Cập nhật thông tin dịch vụ
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: ID của dịch vụ
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *     responses:
//  *       200:
//  *         description: Dịch vụ đã được cập nhật
//  */
// router.put('/services/:id', (req, res) => {
//     const serviceId = parseInt(req.params.id, 10);
//     const service = services.find((s) => s.id === serviceId);
//     if(service){
//         service.name = req.body.name;
//         service.price = req.body.price;
//         res.json(service);
//     }else{
//         res.status(404).json({message: 'Dich vu khong ton tai'});
//     }
// });

// /**
//  * @swagger
//  * /services/{id}:
//  *   delete:
//  *     summary: Xoa dich vu
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: ID cua dich vu
//  *     responses:
//  *       200:
//  *         description: Dich vu da duoc xoa
//  */
// router.delete('/services/:id', (req,res) => {
//     const serviceId = parseInt(req.params.id, 10);
//     services = services.filter((s)=> s.id !== serviceId);
//     res.json({message: 'Dich vu da duoc xoa'});
// });

// module.exports = router;

// // export default router;