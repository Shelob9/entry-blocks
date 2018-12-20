<?php


namespace calderawp\calderaForms\EntryBlocks\Blocks\RenderCallback;


interface RenderCallbackContract
{

	public function render(array $atts );


	/**
	 * @return array
	 */
	public function getAtts();

}
