const supabase = require("../config/supabaseClient");



const getPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const getPostById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const createPost = async (req, res) => {
  try {
    const { title, content, image, category } =
      req.body;

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          image,
          category,
          author_id: req.user,
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



const updatePost = async (req, res) => {
  try {
    const { title, content, image, category } =
      req.body;

    const { data, error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        image,
        category,
      })
      .eq("id", req.params.id)
      .select();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const deletePost = async (req, res) => {
  try {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};