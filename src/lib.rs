use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen]
pub struct Game {
  snake: Vec<(u32, u32)>,
  food: (u32, u32),
  direction: (i32, i32),
  width: u32,
  height: u32,
}

#[wasm_bindgen]
impl Game {

  #[wasm_bindgen(constructor)]
  pub fn new(width: u32, height: u32) -> Game {
    Game {
      snake: vec![(width / 2, height / 2)],
      food: (5, 5),
      direction: (1, 0),
      width,
      height,
    }
  }

  pub fn update_position(&self) {
    let (dx, dy) = self.direction;
    let (head_x, head_y) = self.snake[0];
    self.snake[0] = (
      head_x.wrapping_add(dx as u32),
      head_y.wrapping_add(dy as u32),
    )
  }

  pub fn draw(&self) {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document.get_element_by_id("canvas").unwrap();
    let canvas: web_sys::HtmlCanvasElement = canvas
      .dyn_into::<web_sys::HtmlCanvasElement>()
      .unwrap();

    let context = canvas
      .get_context("2d")
      .unwrap()
      .unwrap()
      .dyn_into::<web_sys::CanvasRenderingContext2d>()
      .unwrap();

    context.begin_path();

    // Draw the border
    context.set_line_width(4.0);
    context.stroke_rect(0.0, 0.0, self.width as f64, self.height as f64);

    context.stroke();
  }
}

