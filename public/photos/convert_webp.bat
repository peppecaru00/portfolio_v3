for %%i in (*.jpg) do ffmpeg -i "%%i" -quality 98 -vf scale="iw/2:ih/2" "%%~ni.webp"
pause