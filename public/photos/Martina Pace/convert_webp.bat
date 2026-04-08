for %%i in (*.jpg) do ffmpeg -i "%%i" -quality 96 -vf scale="iw/3:ih/3" "%%~ni.webp"
pause