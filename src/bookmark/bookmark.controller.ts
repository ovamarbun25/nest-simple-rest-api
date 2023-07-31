import { Controller, Get, Patch, UseGuards, Param, Post, Delete, Body, ParseIntPipe, HttpCode, HttpStatus} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarksService: BookmarkService) { }

  @Get()
  getBookmarks(@GetUser('id') userId: number) { 
    return this.bookmarksService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) { 
    return this.bookmarksService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) { 
    return this.bookmarksService.createBookmark(userId, dto); 
  }

  @Patch(':id')
  editBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto) {
    return this.bookmarksService.editBookmarkById(userId, bookmarkId, dto);
   }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarksService.deleteookmarkById(userId, bookmarkId);
   }

}
