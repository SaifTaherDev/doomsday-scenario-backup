#pragma once
class rectangle {
private:
	unsigned int _width;
	unsigned int _height;
public:
	rectangle() 
		:_width{ 0 }, _height{ 0 }
	{ }
	rectangle(unsigned int user_width, unsigned int user_height)
		:_width{ user_width }, _height{ user_height }
	{ }
	unsigned int return_width() const { return _width; }
	unsigned int return_height() const { return _height; }

	void resize(unsigned int new_width, unsigned int new_height) {
		_width = new_width;
		_height = new_height;
	}
	unsigned int area() {
	    return _width * _height;
	}
	unsigned int parameter() {
		return (_width + _height) * 2;
	}
};