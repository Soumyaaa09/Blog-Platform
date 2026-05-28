const supabase = require("../config/supabaseClient");



const getComments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", req.params.postId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const addComment = async (req, res) => {
  try {
    const { post_id, comment } = req.body;

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id,
          user_id: req.user,
          comment,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const deleteComment = async (req, res) => {
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
};