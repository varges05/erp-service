import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 3000
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)
}
bootstrap()
