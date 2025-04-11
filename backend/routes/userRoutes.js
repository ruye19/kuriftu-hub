const express = require("express")
const router = express.Router()

// usercontroller
const authMiddleWare = require("../middleware/authMiddleware")

const { register, login } = require("../controller/userController")

router.post("/signup", register)

router.post("/login", login)



router.get("/", authMiddleWare, async (req, res) => {
    try {
        const [user] = await dbcon.execute(`
            SELECT userid, username, email, full_name, image, description as bio, 
                   
            FROM users
            WHERE userid = ?
        `, [req.user.userid]); // Assuming your auth middleware adds userid
        
        if (user.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add stats if needed
        // const [stats] = await dbcon.execute(`
        //     SELECT COUNT(*) as courses_count, SUM(hours) as hours_spent
        //     FROM user_courses
        //     WHERE userid = ?
        // `, [req.user.userid]);

        // res.json({
        //     ...user[0],
        //     stats: {
        //         courses_count: stats[0].courses_count || 0,
        //         hours_spent: stats[0].hours_spent || 0
        //     }
        // });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add this route for updating user
router.put("/update", authMiddleWare, async (req, res) => {
    try {
        const { full_name, email, description , 
               } = req.body;

        await dbcon.execute(`
            UPDATE users 
            SET full_name = ?, email = ?, description = ?,
            WHERE userid = ?
        `, [
            full_name,
            email,
             description,
           
            req.user.userid
        ]);
        
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// router.get("/", async (req, res) => {
//     try {
//       const [rows] = await dbcon.execute(`
//         SELECT userid, username, email, full_name, image, description
//         FROM users
//       `);
//       res.json(rows);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  


module.exports = router